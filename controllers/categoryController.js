const filesystem = require("fs").promises;
const path = require("path");

const categoriesFilePath = path.join(__dirname, "../data/categories.json");

const getCategories = () => {
  return filesystem
    .readFile(categoriesFilePath, "utf-8")
    .then((categoriesData) => JSON.parse(categoriesData))
    .catch((error) => {
      throw new Error("Não foi possível ler o arquivo");
    });
};

const createCategory = (newCategory) => {
  return getCategories()
    .then((categoriesData) => {
      const id = categoriesData.length + 1
      categoriesData.push({ id, nome: newCategory.nome });
      return filesystem.writeFile(
        categoriesFilePath,
        JSON.stringify(categoriesData)
      );
    })
    .catch((error) => {
      throw new Error("A categoria não foi criada");
    });
};

module.exports = {
  getCategories,
  createCategory
};
