import mongoose from 'mongoose';
import AnimeSchema from '../animes/animes-schema.js';

const personalProfileSchema = mongoose.Schema({
    favorites: [AnimeSchema],
    completed: [AnimeSchema],
    toBeWatched: [AnimeSchema]
});

const schema = mongoose.Schema({
    username: String,
    password: String,
    name: String,
    nick: String,
    bio: String,
    dob: String,
    location: String,
    joined: String,
    email: {
        type:String,
        required: true,
        unique: true
    },
    role: String,
    personalProfile: personalProfileSchema
}, {collection: 'users'});
export default schema;