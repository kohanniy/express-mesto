const fsPromises = require('fs').promises;

function getDataFromFile(path) {
  return fsPromises.readFile(path, { encoding: 'utf8' })
        .then((data) => {
          return JSON.parse(data);
        })
        .catch((err) => {
          console.error(err);
        })
};

module.exports = getDataFromFile;
