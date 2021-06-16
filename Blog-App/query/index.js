const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {});

app.post("/posts", (req, res) => {});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
