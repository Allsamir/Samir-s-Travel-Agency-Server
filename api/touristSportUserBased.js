const express = require("express");
const router = express.Router();
const client = require("../mongoDB/mongoDB");
const database = client.db("travelAgencyDB");
const touristSportBasedOnUser = database.collection("userTouristSports");

async function run() {
  try {
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
    router.get("/:userEmail", async (req, res) => {
      const userEmail = req.params.userEmail;
      const query = { email: userEmail };
      const user = await touristSportBasedOnUser.findOne(query);
      res.json(user.touristSports);
    });
    router.post("/", async (req, res) => {
      const user = req.body;
      const doc = {
        email: user.email,
        touristSports: [],
      };
      const result = await touristSportBasedOnUser.insertOne(doc);
      res.json(result);
    });
    router.patch("/", async (req, res) => {
      const data = req.body;
      const filter = { email: data.email };
      const options = { upsert: true };
      const updateDoc = {
        $push: {
          touristSports: data.touristSportData,
        },
      };
      const result = await touristSportBasedOnUser.updateOne(
        filter,
        updateDoc,
        options,
      );
      res.json(result);
    });
    router.patch("/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const filter = {
        email: user.email,
        "touristSports._id": id,
      };
      const update = {
        $set: {
          "touristSports.$.tourists_spot_name": user.data.tourists_spot_name,
          "touristSports.$.country_Name": user.data.country_Name,
          "touristSports.$.location": user.data.location,
          "touristSports.$.short_description": user.data.short_description,
          "touristSports.$.travel_time": user.data.travel_time,
          "touristSports.$.totalVisitorsPerYear":
            user.data.totalVisitorsPerYear,
          "touristSports.$.average_cost": user.data.average_cost,
          "touristSports.$.seasonality": user.data.seasonality,
          "touristSports.$.image_URL": user.data.image_URL,
        },
      };
      const result = await touristSportBasedOnUser.updateOne(filter, update);
      res.json(result);
    });

    router.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const filter = {
        email: user.email,
        "touristSports._id": id,
      };
      const updateDoc = {
        $pull: {
          touristSports: { _id: id },
        },
      };
      const result = await touristSportBasedOnUser.updateOne(filter, updateDoc);
      res.json(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

module.exports = router;
