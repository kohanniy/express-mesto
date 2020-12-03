const path = require('path');
const getDataFromFile = require('../helpers/readFiles');

const filePath = path.join(__dirname, '..', 'data', 'users.json');

function getUsers(req, res) {
  return getDataFromFile(filePath)
    .then((users) => {
      if (!users) {
        return res.status(404).send({ message: 'Ресурс не найден' });
      }
      return res.send(users);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
}

function getUser(req, res) {
  return getDataFromFile(filePath)
    .then((users) => users.find((user) => user._id === req.params.id))
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(user);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
}

module.exports = {
  getUsers,
  getUser,
};
