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
    router.get("/limitedSports", async (req, res) => {
      const cursor = touristSports.find().limit(6);
      const sixTouristSport = await cursor.toArray();
      res.json(sixTouristSport);
    });
    router.get("/ascendingOrder", async (req, res) => {
      const cursor = touristSports.find().sort({ average_cost: 1 });
      const inAscendingOrder = await cursor.toArray();
      res.json(inAscendingOrder);
    });
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
    router.get("/country/:countryName", async (req, res) => {
      const countryName = req.params.countryName;
      const cursor = touristSports.find({
        country_Name: countryName,
      });
      const result = await cursor.toArray();
      res.json(result);
    });
    router.post("/", async (req, res) => {
      const touristSport = req.body;
      const result = await touristSports.insertOne(touristSport);
      res.json(result);
    });
    router.put("/:id", async (req, res) => {
      const toursitSportID = req.params.id;
      const newData = req.body;
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          tourists_spot_name: newData.tourists_spot_name,
          country_Name: newData.country_Name,
          location: newData.location,
          short_description: newData.short_description,
          travel_time: newData.travel_time,
          totalVisitorsPerYear: newData.totalVisitorsPerYear,
          average_cost: newData.average_cost,
          seasonality: newData.seasonality,
          image_URL: newData.image_URL,
        },
      };
      const result = await touristSports.updateOne(
        { _id: new ObjectId(toursitSportID) },
        updateDoc,
        options,
      );
      res.json(result);
    });
    router.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const result = await touristSports.deleteOne({ _id: new ObjectId(id) });
      res.json(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

module.exports = router;
