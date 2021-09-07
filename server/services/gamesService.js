const {Game} = require('../models/gameModel');
const { User } = require('../models/userModel');

const getGames = async (user, searchString) => {
  const games = await Game.find();
  const result = games.filter(({name}) => {
    if(user.games.filter(game => game.name===name).length) {
      return false
    } else { 
       if(searchString) {
        return name.toLowerCase().includes(searchString.toLowerCase());
      } else {
        return true;
      }
    }
  });
  return result;
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

module.exports = {
    addGame,
    getGames,
    addGameToUser
};