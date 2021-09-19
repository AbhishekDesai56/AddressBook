const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema({
	firstName: {
		type:  String,
		required: true
	},
	lastName: {
		type:  String,
		required: true
	},
    email: {
        type: Number,
        required: true,
        unique: true
    },
	password: {
		type:  String,
		required: true
	},
});

// Compile model from schema
const userModelDB = mongoose.model("user", userSchema);
