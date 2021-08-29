const express = require('express');
const router = express.Router();

const {
    deleteUserById,
    getUserById,
    updateUserById,
    getUsers,
    sendFriendRequest,
    acceptFriendRequest,
    searchUsers
} = require('../services/usersService');

const {
    asyncWrapper
} = require('../utils/apiUtils');
const {
    InvalidRequestError
} = require('../utils/errors');

router.get('/me', asyncWrapper(async (req, res) => {
    if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.json({ message: 'Not authorized' });
  }
}));

router.delete('/me', asyncWrapper(async (req, res) => {
    const { userId } = req.user;
    await deleteUserById(userId);

    res.json({message: "User deleted successfully"});
}));

router.patch('/me', asyncWrapper(async (req, res) => {
    const { _id } = req.session.user;
    await updateUserById(_id,req.body)
    const newUser = await getUserById(_id);
    req.session.user = newUser;
    res.json({message: "Password updated successfully"});
}));

router.post('/search/filter', asyncWrapper(async (req, res) => {
    const searchString = req.body.username;
    const result = await searchUsers(req.session.user,searchString);
    res.json(result)
}));

router.get('/search', asyncWrapper(async (req, res) => {
    const result = await searchUsers(req.session.user);
    console.log(result);
    res.json(result)
}));

router.post('/friends/request', asyncWrapper(async (req, res) => {
    await sendFriendRequest(req.body._id,req.session.user)
    res.json('Request sent!')
}));

router.post('/friends/accept', asyncWrapper(async (req, res) => {
    console.log(req.body)
    await acceptFriendRequest(req.body,req.session.user)
    res.json('Request sent!')
}));


module.exports = {
    usersRouter: router
}