const mongoose = require("mongoose");
const config = require("./config");

module.exports = async (req, res) => {
  try {
    await mongoose.connect(config.db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("mongoDB Connected...");
  } catch (err) {
    res.statusCode = 500;
    res.json({ Error: "Internal Server Error" });
    console.log(err);
  }
};
