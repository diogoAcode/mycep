const express = require('express');
const cepRoutes = require('./routes/cepRoutes');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('DEUS É SEMPRE BOM!');
  console.log('ponto de entrada');
})

app.get('/cep', cepRoutes);

app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:' + port);
})
