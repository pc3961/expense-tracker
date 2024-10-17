import express from "express";
import dotenv from "dotenv";
import router from "./routes/transactions.js";
import colors from 'colors';
import morgan from 'morgan';
import connectDB from "./config/db.js";
dotenv.config({path: './config/config.env'});

connectDB();

const transaction = router;
const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transaction);

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server listening on ${PORT}`.yellow.bold));