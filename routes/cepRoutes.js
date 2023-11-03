const express = require('express');
const router = express.Router();
const cepController = require('../controllers/cepController');

router.get('/cep', (req, res) => {
  cepController.getCep()
  .then((ceps) => res.json(ceps))
  .catch((error) => res.status(500).send('Erro ao obter os Ceps'))

  console.log("camada de roteamento");
})


module.exports = router;