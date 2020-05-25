const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const urlRoute = require("./routes/urlRoute");
const connectDB = require("./db");

const app = express();

connectDB();

app.use(logger("dev"));
app.use(bodyParser.json());

app.use("/", urlRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
