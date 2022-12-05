import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    role: String,
}, {collection: 'users'});
export default schema;