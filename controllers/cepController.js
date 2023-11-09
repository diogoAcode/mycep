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
        cep.cep.toLowerCase().includes(cepName.toLowerCase())
      );

      return filtredProds;
    })
    .catch((error) => {
      throw new Error("Não foi possível encontrar Ceps pelo nome");
    });
};

const updateCep = (cepId, updatedData) => {
  return getCeps()
    .then((cepData) => {
      const cepIndex = cepData.findIndex(
        (cep) => cep.id === parseInt(cepId)
      );

      if (cepIndex != -1) {
        const existingCep = cepData[cepIndex];

        if (updatedData.bairro != undefined) {
          existingCep.bairro = updatedData.bairro;
        }
        if (updatedData.localidade != undefined) {
          existingCep.localidade = updatedData.localidade;
        }

        cepData[cepIndex] = existingCep;

        return filesystem
          .writeFile(
            cepFilePath,
            JSON.stringify(cepData, null, 2),
            "utf-8"
          )
          .then(() => {
            return existingCep;
          })
          .error((error) => {
            throw new Error("Não foi possível atualizar o cep!");
          });
      } else {
        throw new Error("Não foi encontrado cep com esse id!");
      }
    })
    .catch((error) => {
      throw new Error("Não possível ler os ceps!");
    });
};

const deleteCep = (cepId) => {
  return getCeps()
    .then((cepsData) => {
      const cepIndex = cepsData.findIndex(
        (cep) => cep.id === parseInt(cepId)
      );

      if (cepIndex != -1) {
        const updatedCepsData = cepsData.filter(
          (cep) => cep.id !== parseInt(cepId)
        );

        const deletedCep = cepsData[cepIndex];

        return filesystem
          .writeFile(
            cepFilePath,
            JSON.stringify(updatedCepsData, null, 2),
            "utf-8"
          )
          .then(() => {
            return deletedCep;
          })
          .catch((error) => {
            throw new Error("Não foi possível excluir o cep!");
          });
      } else {
        throw new Error("Cep não encontrado!");
      }
    })
    .catch((error) => {
      throw new Error(
        "Não possível ler os produtos para posteriormente apagar um deles!"
      );
    });
};

module.exports = {
  getCepById,
  getCeps,
  searchCepByName,
  updateCep,
  deleteCep
}