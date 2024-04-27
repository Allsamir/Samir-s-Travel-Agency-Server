require("dotenv").config();
const express = require("express");
const app = express();
const touristSports = require("./api/touristSport");
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/tourist-sports", touristSports);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
