const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {
  createUser, login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', createUser);
app.post('/signin', login);

// app.use('/*', (req, res) => {
//   res.status(403).send({ message: 'Нет доступа, необходимо зарегистрироваться' });
// });

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardsRouter);

// Обработка неправильного пути
app.use('/*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

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
