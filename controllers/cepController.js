const filesystem = require("fs").promises;
const path = require("path");

const cepFilePath = path.join(__dirname, "../data/cep.json");

const getCeps = () => {
  return filesystem
    .readFile(cepFilePath, "utf-8")
    .then((cepsData) => JSON.parse(cepsData))
    .catch((error) => {
      throw new Error("Não foi possível ler o arquivo de Ceps!");
    });
};

const getCepById = (cepId) => {
  return getCeps()
    .then((allCeps) => allCeps.find((cep) => cep.id === parseInt(cepId)))
    .catch((error) => {
      throw new Error("Não foi possível encontrar o Cep");
    });
};


module.exports = {
  getCepById,
  getCeps
}