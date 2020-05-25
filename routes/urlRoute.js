const express = require("express");
const config = require("../config");
const shortid = require("../api/shortid");
const URL = require("../models/URL");

const router = express.Router();

router.route("/api/shortenUrl").post(async (req, res, next) => {
  try {
    const { longUrl } = req.body;
    let url = await URL.findOne({ longUrl });
    if (url) {
      res.statusCode = 200;
      res.json(url);
    } else {
      const urlCode = shortid();
      const shortUrl = config.baseUrl + urlCode;
      let resp = await URL.create({ longUrl, shortUrl, urlCode });
      res.statusCode = 200;
      res.json(resp);
    }
  } catch (err) {
    res.statusCode = 500;
    res.json({ Error: "Internal Server Error" });
    console.log(err);
  }
});

router.route("/:urlCode").get(async (req, res) => {
  try {
    const urlCode = req.params.urlCode;
    let url = await URL.findOne({ urlCode });
    if (url) {
      res.statusCode = 200;
      res.redirect(url.longUrl);
    } else {
      res.statusCode = 401;
      res.json({ Error: "Url Not Found!" });
    }
  } catch (err) {
    res.statusCode = 500;
    res.json({ Error: "Internal Server Error" });
    console.log(err);
  }
});
module.exports = router;
