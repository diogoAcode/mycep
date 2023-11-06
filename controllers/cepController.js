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

const searchCepByName = (cepName) => {
  return getCeps()
    .then((cepsData) => {
      const filtredProds = cepsData.filter((cep) =>
        cep.title.toLowerCase().includes(cepName.toLowerCase())
      );

      return filtredProds;
    })
    .catch((error) => {
      throw new Error("Não foi possível encontrar Ceps pelo nome");
    });
};


module.exports = {
  getCepById,
  getCeps,
  searchCepByName
}