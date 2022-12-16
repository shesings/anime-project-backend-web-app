import mongoose from 'mongoose';

const schema = mongoose.Schema({
    animeId: String,
    animeTitle: String,
    ratingScore: String,
    details: String
}, {collection: 'animes'});
export default schema;