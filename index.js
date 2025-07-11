const express = require("express");
const cors = require("cors")
const app = express();
const port = process.env.Port || 5000;

app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    res.send("hello coffee server welcome to my database")
})
app.listen(port,()=>{
    console.log(`server port is ${port}`)
})