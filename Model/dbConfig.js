const mongoose = require('mongoose');

let mongoURL = process.env.DATABASE_URI;

mongoose.connect(mongoURL, {useUnifiedTopology : true, useNewUrlParser : true})

var connection = mongoose.connection;

connection.on('error', () => {
    console.log("MongoDB Connection Failed");
    process.exit(0)
})

connection.on('connected', () => {
    console.log("MongoDB Connected Successfully");
})

module.exports = mongoose