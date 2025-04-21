import dotenv from 'dotenv'
import express from 'express'
import AuthRoutes from'./routes/AuthRoutes.js'
import connectDB from './config/db.js'

dotenv.config()


const app = express();

// Middlewares
app.use(express.json());

// Rotas
app.use('/api/auth', AuthRoutes);

const startServer = () => {
  app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
}

// Conexão com MongoDB e start do servidor
await connectDB(startServer)

