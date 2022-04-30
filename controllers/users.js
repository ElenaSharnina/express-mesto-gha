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
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
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
