const path = require('path');
const getDataFromFile = require('../helpers/readFiles');

const filePath = path.join(__dirname, '..', 'data', 'cards.json');

function getCards(req, res) {
  return getDataFromFile(filePath)
    .then((cards) => {
      if (!cards) {
        return res.status(404).send({ message: 'Ресурс не найден' });
      }
      return res.send(cards);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
}

module.exports = getCards;
