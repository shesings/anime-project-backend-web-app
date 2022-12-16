// import mongoose from "mongoose";
import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";
import LoginController from './controllers/users/login-controller.js';
import UserController from "./controllers/users/users-controller.js";
const app = express()
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/local');
UserController(app);
LoginController(app);
app.listen(process.env.PORT || 4000);


// mongoose.connect('mongodb://localhost:27017/animate');