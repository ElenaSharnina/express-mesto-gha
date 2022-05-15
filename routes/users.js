const userRouter = require('express').Router();
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateAvatar, updateProfileInfo, getUserInfo,
} = require('../controllers/users');

const regex = /^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)([A-Za-z]){2,3}(\/)?/;

userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);
userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUserById);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfileInfo);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex).required(),
  }),
}), updateAvatar);

module.exports = userRouter;
