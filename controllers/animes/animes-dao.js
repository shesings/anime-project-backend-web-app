import animesModel from './animes-model.js';

export const findUsers = () => animesModel.find();
export const createUser = (anime) => animesModel.create(anime);
export const deleteUser = (aid) => animesModel.deleteOne({_id: aid});
export const updateUser = (aid, anime) => animesModel.updateOne({_id: aid}, {$set: anime});