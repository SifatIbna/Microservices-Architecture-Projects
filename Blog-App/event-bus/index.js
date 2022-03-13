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

const events = [];

app.post("/events", async(req, res) => {
  const { type } = req.body;
  console.log(type);
  const event = req.body;

  events.push(event);

  await axios.post("http://posts-clusterip-srv:4000/events", event);
  // await axios.post("http://localhost:4001/events", event);
  // await axios.post("http://localhost:4002/events", event);
  // await axios.post("http://localhost:4003/events",event);

  res.send({ status: "OK" });
});

app.get('/events',(req,res)=>{
  res.send(events);
})

app.listen(4005, () => {
  console.log("Listening on 4005");
});
