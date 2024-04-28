require("dotenv").config();
const express = require("express");
const app = express();
const touristSports = require("./api/touristSport");
const touristSportBasedOnUser = require("./api/touristSportUserBased");
const countries = require("./api/countries");
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/tourist-sports", touristSports);
app.use("/my-tourist-sports", touristSportBasedOnUser);
app.use("/countries", countries);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
