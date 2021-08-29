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
  console.log(req.body)
    const games = await getGames(req.session.user,req.body.name);
    res.json(games);
    console.log(games);
}));

router.get('/:id', asyncWrapper(async (req, res) => {
    const { userId } = req.user;
    const { id } = req.params;

    const note = await getNoteByIdForUser(id, userId);

    if (!note) {
        throw new InvalidRequestError('No note with such id found!');
    }

    res.json({note});
}));

router.post('/', asyncWrapper(async (req, res) => {
    await addGame(req.body)
    res.json({message: "Note created successfully"});
}));

router.post('/post', asyncWrapper(async (req, res) => {
  await addGameToUser(req.session.user._id, req.body);
  const newUser = await getUserById(req.session.user._id);
  req.session.user = newUser;
  res.json({message: "Game added!"});
}));


router.put('/:id', asyncWrapper(async (req, res) => {
    const { userId } = req.user;
    const { id } = req.params;
    const data = req.body;

    await updateNoteByIdForUser(id, userId, data);

    res.json({message: "Note updated successfully"});
}));

router.patch('/:id', asyncWrapper(async (req, res) => {
    const { userId } = req.user;
    const { id } = req.params;

    await checkNoteByIdForUser(id, userId);

    res.json({message: "Note updated successfully"});
}));

router.delete('/:id', asyncWrapper(async (req, res) => {
    const { userId } = req.user;
    const { id } = req.params;

    await deleteNoteByIdForUser(id, userId);
    
    res.json({message: "Note deleted successfully"});
}));

module.exports = {
    gamesRouter: router
}