const {User} = require('../models/userModel');

const getUserById = async (userId) => {
    const user = await User.findOne({_id: userId});
    if(!user) {
        throw new Error('No such user');
    }
    return user;
}

const deleteUserById = async (userId) => {
    await User.findOneAndRemove({_id: userId});
}

const updateUserById = async (userId, data) => {
   const newUser = await User.findOneAndUpdate({_id:userId}, { $set: data});
   return newUser;
}

const getUsers = async () => {
    return await User.find();
}

const sendFriendRequest = async (userId, friend) => {
   const user = await User.findById(userId);
   await User.findByIdAndUpdate(userId,{$set:{
       requests:[...user.requests,friend]
   }})
}

const acceptFriendRequest = async (friend, user) => {
   const newRequests = user.requests.filter(user => user._id!==friend._id);
   await User.findByIdAndUpdate(user._id,{$set:{
       requests:newRequests,
       friends: [...user.friends, friend]
   }})
   await User.findByIdAndUpdate(friend._id,{$set:{
       friends: [...friend.friends, user]
   }})
}

const rejectFriendRequest = async (friend, user) => {
   const newRequests = user.requests.filter(user => user._id!==friend._id);
   await User.findByIdAndUpdate(user._id,{$set:{
       requests:newRequests
   }})
}

const searchUsers = async (user,searchString) => {
    const users = await getUsers();
    const friends = user.friends;
    const userRequests = user.requests
    return users.filter(({username, requests}) => {
        if(!username || username===user.username || friends.filter(friend=>friend.username===username).length
        || requests.filter(request => request.username===user.username).length
        || userRequests.filter(userRequest => userRequest.username===username).length) {
            return false
        } else {
            if(searchString) {
                return username.toLowerCase().includes(searchString.toLowerCase());
            } else {
                return true;
            }
        }
    })
}

const removeFriend = async (friendId, userId) => {
   const user = await User.findById(userId);
   await User.findByIdAndUpdate(userId,{$set:{
       friends:user.friends.filter(friend => friend._id!==friendId)
   }})
   const friend = await User.findById(friendId);
   await User.findByIdAndUpdate(friendId,{$set:{
       friends:friend.friends.filter(friend => friend._id!==userId)
   }})
}

module.exports = {
    deleteUserById,
    updateUserById,
    getUserById,
    getUsers,
    sendFriendRequest,
    acceptFriendRequest,
    searchUsers,
    removeFriend,
    rejectFriendRequest
};