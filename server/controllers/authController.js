const express = require('express');
const router = express.Router();

const {
    registration,
    signIn
} = require('../services/authService');

const {
    asyncWrapper
} = require('../utils/apiUtils');
const {
    registrationValidator
} = require('../middlewares/validationMidlleware');
const { User } = require('../models/userModel');

router.post('/register', asyncWrapper(async (req, res) => {
    const {
        email,
        password
    } = req.body;

    await registration({email, password});

    res.json({message: 'Account created successfully!'});
}));

router.post('/login', asyncWrapper(async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const user = await signIn({email, password});
    if(!user) {
        res.json({message: 'Incorrect email or password'})
    }
    else {
        req.session.user = user;
        res.json({ message: 'Logged in successfully!'})
    }
}));

module.exports = {
    authRouter: router
}