const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config");
require("./config/dbConfig");
require("./app/model/user");
const notFound = require("./app/middleware/notfound");

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
const user = require("./app/router/user");

//routes
app.use("/api/v1/user", user); 
app.use(notFound);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node Server Running in ${port}`));
