const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", (req, res) => {
  categoryController
    .getCategories()
    .then((categories) => res.json(categories))
    .catch((error) => res.status(500).send("Erro ao obter as categorias"));

  console.log("camada de roteamento");
});

router.post("/", (req, res) => {
  const newCategory = req.body;
  categoryController
    .createCategory(newCategory)
    .then(() => res.status(201).send("Categoria criada com sucesso"))
    .catch((error) => res.status(500).send("Erro ao criar a categoria"));
});

router.put("/:id", (req, res) => {
  const idRecebido = req.params.id;
  const updatedData = req.body;

  categoryController
    .updateCategory(idRecebido, updatedData)
    .then(() => {
     return res.status(200).send("Categoria atualizada com sucesso!");
    })
    .catch((error) => {
      res.send(error);
    });
});

router.delete("/:id", (req, res) => {
  const idRecebido = req.params.id;

  categoryController
    .deleteCategory(idRecebido)
    .then((deletedCategory) => {
      res.status(200).json(deletedCategory);
    })
    .catch((error) => {
      res.status(404).send("Categoria não encontrada");
    });
});


module.exports = router;
