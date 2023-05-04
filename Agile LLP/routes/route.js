const express = require("express");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getLatestevents,
} = require("../controllers/eventcrud");
const multer = require("multer");
const router = express.Router();
const storage = multer.memoryStorage();

// Create multer instance
const upload = multer({ storage });

router
  .route("/events")
  .post(upload.single("files"), createEvent)
  .get(async (req, res) => {
    if (req.query.id) {
      await getEventById(req, res);
    } else {
        console.log("ghe");
      await getLatestevents(req, res);
    }
  });

router
  .route("/events/:id")
  .put(upload.single("files"), updateEvent)
  .delete(deleteEvent);

module.exports = router;
