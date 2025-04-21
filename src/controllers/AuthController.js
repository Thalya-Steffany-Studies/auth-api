import AuthService from '../services/AuthService.js';

export class AuthController {
    register = async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await AuthService.register(email, password);
            res.status(201).json({ message: 'Usuário criado com sucesso', userId: user._id });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const { accessToken, refreshToken } = await AuthService.login(email, password);
            res.status(200).json({ accessToken, refreshToken });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    refreshToken = async (req, res) => {
        const { refreshToken } = req.body;
        try {
            const { accessToken } = await AuthService.refresh(refreshToken);
            res.status(200).json({ accessToken });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
}

const AuthControllerInstance = new AuthController()

export default AuthControllerInstance