const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require("axios");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  console.log(posts[id]);

  axios({
    url: "http://localhost:4005/events",
    method: "post",
    data: {
      type: "postCreated",
      data: {
        id,
        title,
      },
    },
  })
    .then((res) => {})
    .catch((err) => console.error(err));

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log(req.body);
  console.log("Event Received", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("New Version Again!")
  console.log("Listening on 4000");
});
