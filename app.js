const express = require("express");
const app = express();

//import 
require('express-async-errors');
require("dotenv/config");
require("./model/dbConfig");
require("./model/user");
// require("./EventSchuduler/inactivatePost")

// import middlewares
const cors = require("cors");
const { errorHandler } = require('./middleware/errorHandler');
const notFound = require("./middleware/notfound");
var fileupload = require("express-fileupload");

//import routes
const user = require("./router/user");
const post = require("./router/post");
const boarding = require("./router/boarding");
const payment = require("./router/payment");


// Middleware
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./assets"));
app.use(fileupload({ useTempFiles: true }));

//routes
app.use("/api/v1/user", user);
app.use("/api/v1/post", post);
app.use("/api/v1/boarding", boarding);
app.use("/api/v1/payment", payment);

app.use(notFound); // handle invalid routes
app.use(errorHandler) // handle errors


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node Server Running in ${port}`));
