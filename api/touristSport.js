const express = require("express");
const router = express.Router();
const client = require("../mongoDB/mongoDB");
const database = client.db("travelAgencyDB");
const touristSports = database.collection("touristSports");
const { ObjectId } = require("mongodb");

async function run() {
  try {
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
    router.get("/", async (req, res) => {
      const cursor = touristSports.find({});
      const allTouristSports = await cursor.toArray();
      res.json(allTouristSports);
    });
    router.get("/:id", async (req, res) => {
      const id = req.params.id;
      const result = await touristSports.findOne({ _id: new ObjectId(id) });
      res.json(result);
    });
    router.post("/", async (req, res) => {
      const touristSport = req.body;
      const result = await touristSports.insertOne(touristSport);
      res.json(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

module.exports = router;
