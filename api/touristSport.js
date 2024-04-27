const express = require("express");
const router = express.Router();
const client = require("../mongoDB/mongoDB");

router.get("/", (req, res) => {
  res.send("Tourist Sport api");
  console.log("Tourist Sport api");
});

async function run() {
  try {
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

module.exports = router;
