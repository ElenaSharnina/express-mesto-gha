/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
// const UnauthorizedError = require('../errors/unauthorized-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // через это не проходят автотесты!!!! через куки не работет постман

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).send({ message: 'Необходима авторизация' });
  }
  // if (!req.cookies.jwt) {
  //   throw new UnauthorizedError('Необходима авторизация');
  // }
  const token = authorization.replace('Bearer ', '');
  // const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    res.status(401).send({ message: 'Необходима авторизация' });
    // throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
