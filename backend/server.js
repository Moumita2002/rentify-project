const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db.js");
const path = require("path");

// dotenv config
dotenv.config();

//mongoDB connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use('/api/v1/properties', require('./routes/propertyRoutes'));

// STATIC FOLDER
app.use(express.static(path.join(__dirname, "./client/build")));

// STATIC ROUTES
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// creating port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`Node server running at ${process.env.PORT}`);
});
