const fs = require("fs");
const path = require("path");
const event = require("../models/event");

async function createEvent(req, res) {
  try {
    console.log(req.file);
    console.log(req.body);

    const imageFile = req.file;
    const imagesDirPath = path.join(__dirname, "../images");
    const imageExtension = path.extname(imageFile.originalname);
    const imageName = `${req.body.uid}-${Date.now()}${imageExtension}`;
    const imagePath = path.join(imagesDirPath, imageName);

    // Create the images folder if it doesn't exist
    if (!fs.existsSync(imagesDirPath)) {
      fs.mkdirSync(imagesDirPath);
    }

    fs.writeFileSync(imagePath, imageFile.buffer);

    let attendeesStr = req.body.attendees;
    const attendees = JSON.parse(attendeesStr);

    console.log("attendees:", attendees);

    // create event object with image directory property
    const newEvent = new event({
      type: req.body.type,
      uid: req.body.uid,
      name: req.body.name,
      tagline: req.body.tagline,
      schedule: req.body.schedule,
      description: req.body.description,
      moderator: req.body.moderator,
      category: req.body.category,
      sub_category: req.body.sub_category,
      rigor_rank: req.body.rigor_rank,
      attendees,
      image: imagePath,
    });

    // save the new event to the database
    await newEvent.save();

    // console.log(req.body);

    res
      .status(200)
      .json({ success: true, message: `Event created successfully!` });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: `Error: ${error.message}` });
  }
}

async function updateEvent(req, res) {
  try {
    const eventId = req.params.id;
    const eventDetails = await event.findById(eventId);

    if (!eventDetails) {
      return res.status(404).json({
        success: false,
        message: `Event not found with id: ${eventId}`,
      });
    }

    // Update event fields
    eventDetails.name = req.body.name;
    eventDetails.tagline = req.body.tagline;
    eventDetails.schedule = req.body.schedule;
    eventDetails.description = req.body.description;
    eventDetails.moderator = req.body.moderator;
    eventDetails.category = req.body.category;
    eventDetails.sub_category = req.body.sub_category;
    eventDetails.rigor_rank = req.body.rigor_rank;

    // Update attendees
    
    let attendeesStr = req.body.attendees;
    console.log(attendeesStr);
    const attendees = JSON.parse(attendeesStr);
    eventDetails.attendees = attendees

    // Update image file, if included in the request
    const imageFile = req.file;
    if (imageFile) {
      const imagesDirPath = path.join(__dirname, "images");
      const imageExtension = path.extname(imageFile.originalname);
      const imageName = `${req.body.uid}-${Date.now()}${imageExtension}`;
      const imagePath = path.join(imagesDirPath, imageName);

      // Create the images folder if it doesn't exist
      if (!fs.existsSync(imagesDirPath)) {
        fs.mkdirSync(imagesDirPath);
      }

      fs.writeFileSync(imagePath, imageFile.buffer);
      eventDetails.file = imagePath
    }

    // Save updated event
    const updatedEvent = await eventDetails.save();

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    console.log(error);
  }
}

async function deleteEvent(req, res) {
  try {
    const eventId = req.params.id;
    const eventDetails = await event.findById(eventId);
    
    if (!eventDetails) {
      return res.status(404).json({
        success: false,
        message: `Event not found with id: ${eventId}`,
      });
    }

    await event.deleteOne({ _id: eventId });


    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
    console.error(error);
  }
}

async function getEventById(req, res) {
  try {
    const eventId = req.query.id;
    const eventDetails = await event.findById(eventId);

    if (!eventDetails) {
      return res.status(404).json({
        success: false,
        message: `Event not found with id: ${eventId}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Event retrieved successfully",
      data: eventDetails,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    console.log(error);
  }
}

async function getLatestevents (req, res) {
  const {type, limit, page } = req.query;
  try {
    const events = await event.find()
  .sort({ schedule: 'desc' })
  .skip((page - 1) * limit)
  .limit(limit)
  .exec();

    res.status(200).json({success: true, message: events});
  } catch (err) {
    res.status(500).json({success: false, message: err.message });
  }
};


module.exports = {
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  getLatestevents
};
