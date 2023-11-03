const filesystem = require('fs').promises;
const path = require('path');

const cepFilePath = path.join(__dirname, '../data/cep.json');

const getCep = () => {
  return filesystem.readFile(cepFilePath, 'utf-8')
    .then((cepData) => JSON.parse(cepData))
    .catch((error) => {
      throw new Error('Não foi possíel ler o arquivo');
    });
};

module.exports = {
  getCep,
}