const express = require("express");
const router = express.Router();
const cepController = require("../controllers/cepController");

router.get("/", (req, res) => {
  cepController.getCeps()
    .then((cepsData) => res.json(cepsData))
    .catch((error) => res.status(500).send('Erro ao obter ceps'))
});

router.get("/:id", (req, res) => {
  const idRecebido = req.params.id;
  cepController
    .getCepById(idRecebido)
    .then((cepRecebido) => {
      if (cepRecebido) {
        res.status(200).send(cepRecebido);
      } else {
        res.status(404).send("Cep não encontrado");
      }
    })
    .catch((error) => res.status(500).send());
});


module.exports = router;