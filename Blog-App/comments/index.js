const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content: content });
  commentsByPostId[req.params.id] = comments;

  axios({
    url: "http://localhost:4005/events",
    method: "POST",

    data: {
      type: "commentCreated",
      data: {
        id: commentId,
        content,
        postId: req.params.id,
      },
    },
  })
    .then((res) => {})
    .then((err) => {
      console.log(err);
    });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.event.type);

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
