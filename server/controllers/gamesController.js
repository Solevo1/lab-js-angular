const express = require('express');
const { addGame, getGames, addGameToUser } = require('../services/gamesService');
const router = express.Router();

const { getUserById } = require('../services/usersService');

const {
    asyncWrapper
} = require('../utils/apiUtils');
const {
    InvalidRequestError
} = require('../utils/errors');

router.get('/', asyncWrapper(async (req, res) => {
    const games = await getGames(req.session.user);
    res.json(games);
}));

router.post('/search', asyncWrapper(async (req, res) => {
    const games = await getGames(req.session.user,req.body.name);
    res.json(games);
}));

router.post('/post', asyncWrapper(async (req, res) => {
  await addGameToUser(req.session.user._id, req.body);
  const newUser = await getUserById(req.session.user._id);
  req.session.user = newUser;
  res.json({message: "Game added!"});
}));

module.exports = {
    gamesRouter: router
}