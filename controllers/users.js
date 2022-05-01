const User = require('../models/user');
// коды с тренажера
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(404).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};
// с вебинара
// module.exports.createUser = async (req, res) => {
//   try {
//     const user = new User(req.body);
//     res.status(201).send(await user.save());
//   } catch (err) {
//     if (err.errors.name.name === "ValidationError") {
//       res.status(400).send({
//         message: "Ошибка в веденных данных",
//         ...err,
//       })
//     };
//     res.status(500).send({
//       message: "Произошла ошибка в работе сервера",
//       err,
//     });
//   }
// }
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      // upsert: true, // если пользователь не найден, он будет создан
    },
  )
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Данные не прошли валидацию. Либо произошло что-то совсем немыслимое' }));
};

module.exports.updateProfileInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      // upsert: true, // если пользователь не найден, он будет создан
    },
  )
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Данные не прошли валидацию. Либо произошло что-то совсем немыслимое' }));
};
