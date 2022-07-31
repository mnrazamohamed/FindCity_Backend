require('express-async-errors');
require("dotenv/config");

const express = require("express");
const app = express();
const cors = require("cors");
require("./model/dbConfig");
require("./model/user");
const { errorHandler } = require('./middleware/errorHandler');
const notFound = require("./middleware/notfound");

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
const user = require("./router/user");
const post = require("./router/post");
const boarding = require("./router/boarding");
const payment = require("./router/payment");

//routes
app.use("/api/v1/user", user);
app.use("/api/v1/post", post);
app.use("/api/v1/boarding", boarding);
app.use("/api/v1/payment", payment);

app.use(notFound); // handle invalid routes
app.use(errorHandler) // handle errors


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node Server Running in ${port}`));
