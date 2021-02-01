const express = require("express");

const imageRouter = express.Router();
const controller = require("../controller/controller");
const multer = require("../middleware/multer");
//routes
imageRouter.get("/", controller.home);

imageRouter.post("/uploadmultiple", [multer.store.array("images", 12)], controller.uploads);

module.exports = {
  imageRouter,
};
