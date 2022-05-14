const userRouter = require('express').Router();
const {
  getUsers, getUserById, updateAvatar, updateProfileInfo, getUserInfo,
} = require('../controllers/users');

userRouter.get('/me', getUserInfo);
userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateProfileInfo);
userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
