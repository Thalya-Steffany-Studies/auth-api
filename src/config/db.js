import mongoose from 'mongoose';

const connectDB = async (callback) => {
  try {
    await mongoose.connect(process.env.DB_STRING_CONNECTION);
    console.log('✅ MongoDB conectado');
    if(callback) callback()
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB', error.message);
    process.exit(1);
  }
};

export default connectDB;
