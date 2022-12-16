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
    firstName: String,
    lastName: String,
    email: {
        type:String,
        required: true,
        unique: true
    },
    role: String,
    personalProfile: personalProfileSchema
}, {collection: 'users'});
export default schema;

// const payload = {
//     "username": "admin2",
//     "email": "user2@admin.com",
//     "password": "pass",
//     "role": "User",
//     "personalProfile": {
//         favorites: [{
//             animeId: '222',
//             animeTitle: 'blue l0ck',
//             ratingScore: '99',
//         }],
//         completed: [{
//             animeId: '223',
//             animeTitle: 'blue l1ck',
//             ratingScore: '99',
//         }],
//         toBeWatched: [{
//             animeId: '224',
//             animeTitle: 'blue l2ck',
//             ratingScore: '99'
//         }]

//     }

// }