const path = require('path');
const getDataFromFile = require('../helpers/readFiles');

const filePath = path.join(__dirname, '..', 'data', 'users.json');

function getUsers(req, res) {
  return getDataFromFile(filePath)
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send(err));
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
    .catch((err) => res.status(500).send(err));
}

module.exports = {
  getUsers,
  getUser,
};
