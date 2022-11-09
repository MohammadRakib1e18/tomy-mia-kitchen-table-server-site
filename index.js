const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
require('dotenv').config();



const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ct9it9z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
  
});

async function run(){
  try{
    const serviceCollection = client.db('tommy-resturant').collection('services');
    app.get('/services', async(req, res)=>{
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = cursor.toArray();
      res.send();
    })

  }
  finally{

  }
}
run().catch((err)=>{console.log('error: ', err)})



const services = require('./data/services.json');

app.get("/services", (req, res) => {
  
  res.send(services);
});

app.listen(port, () => {
  console.log(`mongod db server is running, ${port}`);
  console.log(uri);
});
