const { ENOENT } = require('constants');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function login(req, res) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
      // res.cookie('jwt', token, {
      //   maxAge: 3600000 * 24 * 7,
      //   httpOnly: true,
      // });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
}

// Находим всех пользователей
function getUsers(req, res) {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.code === ENOENT) {
        return res.status(404).send({ message: 'Ресурс не найден' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
}

// Находим конкретного пользователя
function getUser(req, res) {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
}

// Создаем пользователя
function createUser(req, res) {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => {
      const { _id, email } = user;
      res.status(201).send({ _id, email });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Введены неверные данные' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
}

// Обновляем профиль
function updateProfile(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      switch (err.name) {
        case 'CastError':
          return res.status(404).send({ message: 'Пользователь не найден' });
        case 'ValidationError':
          return res.status(400).send({ message: 'Введены неверные данные' });
        default:
          return res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
}

// Обновляем аватар
function updateAvatar(req, res) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      switch (err.name) {
        case 'CastError':
          return res.status(404).send({ message: 'Пользователь не найден' });
        case 'ValidationError':
          return res.status(400).send({ message: 'Введены неверные данные' });
        default:
          return res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
}

module.exports = {
  login,
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
