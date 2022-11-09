const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const services = require('./data/services.json');

app.get("/services", (req, res) => {
  res.send(services);
});

app.listen(port, () => {
  console.log(`mongod db server is running, ${port}`);
});
