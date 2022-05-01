const userRouter = require('express').Router();
const {
  getUsers, getUserById, createUser, updateAvatar, updateProfileInfo,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('/', createUser);
userRouter.patch('/me', updateProfileInfo);
userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
