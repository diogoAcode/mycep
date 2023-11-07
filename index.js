const express = require("express");
const categoryRoutes = require("./routes/categoryRoutes");
const cepRoutes = require("./routes/cepRoutes");
const cors = require('cors');
const redirectMiddleware = require('./middlewares/redirectMiddleware');
const logMiddleware = require("./middlewares/logMiddleware");
const rateLimit = require("./middlewares/rateLimitMiddleware");

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors());
app.use(redirectMiddleware);
app.use(logMiddleware);
app.use(rateLimit);

app.get("/", (req, res) => {
  res.send("Deus é bom o tempo todo!");
});

app.use("/categories", categoryRoutes);
app.use("/ceps", cepRoutes);


app.listen(port, () => {
  console.log("Servidor rodando em http://localhost:" + port);
});
