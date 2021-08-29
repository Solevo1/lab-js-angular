const {User} = require('../models/userModel');

const registration = async ({email, password}) => {
    const user = new User({
        email,
        password
    });
    await user.save();
}

const signIn = async ({email, password}) => {
    const user = await User.findOne({email});
    if(user.password !== password) return null;
    return user;
}

module.exports = {
    registration,
    signIn
};