const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ct9it9z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client
      .db("tommy-resturant")
      .collection("allServices");
    const reviewCollection = client
      .db("tommy-resturant")
      .collection("allReviews");

    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    app.get("/homeServices", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query).limit(3);
      const services = await cursor.toArray();
      res.send(services);
    });
    app.get('/services/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id:ObjectId(id)};
      const service = await serviceCollection.findOne(query);
      res.send(service);
    })
    app.get('/allReviews', async(req, res)=>{
      const query = {};
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    })
    app.post('/addReview', async(req, res)=>{
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
      console.log(result);
    })
  } finally {
  }
}
run().catch((err) => console.log("Error: ", err));

app.listen(port, () => {
  console.log(`mongodb db server is running, ${port}`);
});
