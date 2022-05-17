const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {
  createUser, login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const regexLink = require('./utils/constants');
const errorHandler = require('./errors/errorHandler');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexLink),
  }).unknown(true),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardsRouter);

// Обработка неправильного пути
app.use('/*', auth, () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден.');
});

app.use(errors()); // из celebrate
app.use(errorHandler); // центральный обработчик ошибок

async function main() {
  mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  app.listen(PORT, () => {
    console.log(`Cлушаем ${PORT} порт`);
  });
}

main();
