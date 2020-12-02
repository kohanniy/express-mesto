const path = require('path');
const getDataFromFile = require('../helpers/readFiles');

const filePath = path.join(__dirname, '..', 'data', 'cards.json');

function getCards(req, res) {
  return getDataFromFile(filePath)
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send(err));
}

module.exports = getCards;
