import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

class AuthService {
  async register(email, password) {
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('Usuário já existe');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hashedPassword });
    return user;
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Credenciais inválidas');
    }

    // Gerar tokens
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' } // curta duração
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' } // 7 dias de validade
    );

    // Salvar refresh token no banco
    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error('Refresh token é obrigatório');
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
      throw new Error('Refresh token inválido');
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      const newAccessToken = jwt.sign(
        { id: decoded.id },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new Error('Refresh token expirado ou inválido');
    }
  }
}

const AuthServiceInstance =  new AuthService();
export default AuthServiceInstance