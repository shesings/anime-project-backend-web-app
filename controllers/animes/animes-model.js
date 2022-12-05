import mongoose from 'mongoose';
import animesSchema from './animes-schema.js';

const animesModel = mongoose
    .model('UserModel', animesSchema);
export default animesModel;