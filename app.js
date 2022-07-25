const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config");
require("./config/dbConfig");
require("./app/model/user/user");
require("./app/model/post/post");
require("./app/model/boarding/boarding");
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
const post = require("./app/router/post");
const boarding = require("./app/router/boarding");

//routes
app.use("/api/v1/user", user); 
app.use("/api/v1/post", post); 
app.use("/api/v1/boarding", boarding); 
app.use(notFound);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node Server Running in ${port}`));
