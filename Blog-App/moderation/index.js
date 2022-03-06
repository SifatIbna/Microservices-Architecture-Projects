const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:true
    })
);

app.post('/events',async (req,res)=>{
    const {type,data} = req.body;

    if(type==="commentCreated") {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post("http://localhost:4005/events" ,{
            type: "commentModerated",
            data : {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })
    }

    res.send({});
})

app.listen(4003,()=>{
    console.log("listening on port 4003");
})