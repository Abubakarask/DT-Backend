const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");


require("dotenv").config()
require("./db/conn");

// Using Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [/localhost:[0-9]+$/],
    credentials: true,
  })
);

// Importing Routes
const route = require("./routes/route");

// Using Routes
app.use("/api/v3/app", route);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
