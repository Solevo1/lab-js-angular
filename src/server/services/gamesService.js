const {Game} = require('../models/gameModel');
const { User } = require('../models/userModel');
const { updateUserById } = require('./usersService');

const getGames = async (user, searchString) => {
  const games = await Game.find();
  return games.filter(({name}) => {
    if(user.games.filter(game => game.name===name).length) {
      return false
    } else { 
       if(searchString) {
        return name.toLowerCase().includes(searchString.toLowerCase());
      } else {
        return true;
      }
    }
  })
}

const getNoteByIdForUser = async (noteId, userId) => {
    const note = await Note.findOne({_id: noteId, userId});
    return note;
}

const addGame = async (gamePayload) => {
    const game = new Game({...gamePayload});
    await game.save();
}

const addGameToUser = async (userId,gamePayload) => {
  const user = await User.findById(userId);
   await User.findByIdAndUpdate(userId,{$set:{
       games:[...user.games,gamePayload]
   }})
}

const updateNoteByIdForUser = async (noteId, userId, data) => {
    await Note.findOneAndUpdate({_id: noteId, userId}, { $set: data});
}

const checkNoteByIdForUser = async (noteId, userId) => {
    const note = await getNoteByIdForUser(noteId,userId);
    const data = {
        completed:!note.completed
    }
    await Note.findOneAndUpdate({_id: noteId, userId}, { $set: data});
}

const deleteNoteByIdForUser = async (noteId, userId) => {
    await Note.findOneAndRemove({_id: noteId, userId});
}

module.exports = {
    addGame,
    getGames,
    addGameToUser
};