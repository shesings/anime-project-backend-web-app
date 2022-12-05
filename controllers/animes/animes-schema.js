import mongoose from 'mongoose';

const schema = mongoose.Schema({
    animeId: String,
    animeTitle: String,
    ratingScore: Number,
    userReview: String,
    viewingStatus: String,
    currentEpisode: Number,
    genre: String,
}, {collection: 'animes'});
export default schema;