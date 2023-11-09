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

const updateCategory = (categoryId, updatedData) => {
  return getCategories()
    .then((categoryData) => {
      const categoryIndex = categoryData.findIndex((category) => category.id === parseInt(categoryId));

      if (categoryIndex != -1) {
        const existingCategory = categoryData[categoryIndex];

        if (updatedData.nome != undefined) {
          existingCategory.nome = updatedData.nome;
        }
       
        categoryData[categoryIndex] = existingCategory;

        return filesystem
          .writeFile(categoriesFilePath, JSON.stringify(categoryData, null, 2), "utf-8")
          .then(() => {
            return existingCategory;
          })
          .error((error) => {
            throw new Error("Não foi possível atualizar a categoria!");
          });
      } else {
        throw new Error("Não foi encontrado categoria com esse id!");
      }
    })
    .catch((error) => {
      throw new Error("Não possível ler as categorias!");
    });
};

const deleteCategory = (categoryId) => {
  return getCategories()
    .then((categoriesData) => {
      const categoryIndex = categoriesData.findIndex((category) => category.id === parseInt(categoryId));

      if (categoryIndex != -1) {
        const updatedCategoriesData = categoriesData.filter(
          (category) => category.id !== parseInt(categoryId)
        );

        const deletedCategory = categoriesData[categoryIndex];

        return filesystem
          .writeFile(
            categoriesFilePath,
            JSON.stringify(updatedCategoriesData, null, 2),
            "utf-8"
          )
          .then(() => {
            return deletedCategory;
          })
          .catch((error) => {
            throw new Error("Não foi possível excluir o categpria!");
          });
      } else {
        throw new Error("Categoria não encontrado!");
      }
    })
    .catch((error) => {
      throw new Error(
        "Não possível ler os produtos para posteriormente apagar um deles!"
      );
    });
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory
};
