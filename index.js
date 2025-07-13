// require('dotenv').config();
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());
console.log(process.env.user)
console.log(process.env.password)
 
//  Db_user = coffeeShop2;
// Db_password = RH4RHOIm62x3hIc6;

 
// const uri = `mongodb+srv://coffeeShop2:RH4RHOIm62x3hIc6@cluster0.ejfmzqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri =`mongodb+srv://${process.env.user}:${process.env.password}@cluster0.ejfmzqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
 


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const coffeeCollections2 = client.db("coffeeBD2").collection('coffee2');

    app.get('/coffee', async(req,res)=>{
      const cursor = coffeeCollections2.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.post('/coffee', async(req,res)=>{
      const newCoffee = req.body;
      console.log(newCoffee)
      const result = await coffeeCollections2.insertOne(newCoffee)
      res.send(result)
    })

    app.delete("/coffee/:id", async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await coffeeCollections2.deleteOne(query);
      res.send(result)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send("hello coffee server welcome to my database")
})
app.listen(port,()=>{
    console.log(`server port is ${port}`)
})