const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Tourist Sport api");
  console.log("Tourist Sport api");
});

module.exports = router;
