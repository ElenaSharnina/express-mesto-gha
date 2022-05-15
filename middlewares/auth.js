/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

module.exports = (req, res, next) => {
  // eslint-disable-next-line max-len
  const { authorization } = req.headers; // через это не проходят автотесты!!!! через куки не работет постман

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
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
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user._id = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
