const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '626d8ace1abf42b18638adff',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardsRouter);
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
    // eslint-disable-next-line no-console
    console.log(`Cлушаем ${PORT} порт`);
  });
}

main();
