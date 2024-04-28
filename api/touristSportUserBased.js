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
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

module.exports = router;
