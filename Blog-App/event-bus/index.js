const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/events", (req, res) => {
  console.log(req.body);
  const event = req.body;
  console.log(event);

  axios({
    url: "http://localhost:4000/events",
    method: "post",
    data: {
      event,
    },
  })
    .then((response) => {})
    .catch((error) => {
      console.log("There was  an issue");
    });

  axios({
    url: "http://localhost:4001/events",
    method: "post",
    data: {
      event,
    },
  })
    .then((response) => {})
    .catch((error) => {
      console.log("There was  an issue");
    });

  axios({
    url: "http://localhost:4001/events",
    method: "post",
    data: {
      event,
    },
  })
    .then((response) => {})
    .catch((error) => {
      console.log("There was  an issue");
    });

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
