const fsPromises = require('fs').promises;

function getDataFromFile(pathToFile) {
  return fsPromises.readFile(pathToFile, { encoding: 'utf8' })
    .then((data) => JSON.parse(data));
}

module.exports = getDataFromFile;
