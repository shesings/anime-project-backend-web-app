// import mongoose from "mongoose";
import cors from 'cors';
import express from 'express';
import LoginController from './controllers/login/login-controller.js';
import UserController from "./controllers/users/users-controller.js";
const app = express()
app.use(cors());
app.use(express.json());
UserController(app);
LoginController(app);
app.listen(process.env.PORT || 4000);


// mongoose.connect('mongodb://localhost:27017/animate');