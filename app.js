const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config");
require("./Model/dbConfig");
const notFound = require("./Middleware/notfound");

// Middleware
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());
app.use(express.static("./assets"));

//import routes
const user = require("./Router/User");
const userModel = require("./Model/User");

//routes
app.use("/api/v1/user", user); 
app.use(notFound);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node Server Running in ${port}`));
