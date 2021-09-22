const mongoose = require("mongoose");
const logger = require("logger").createLogger("logger/development.log");
//Set up default mongoose connection

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true},() => { 
	console.log("Database Connected Successfully"); 
	logger.info("Successfully connected to the database");
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));