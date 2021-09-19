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
        type: String,
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

class UserModel {
    createDetails = (userDetails, saveUserDataServiceCallback) => {
        const newUser = new userModelDB({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        password: userDetails.password,
        });

        newUser.save((error, data) => {
        return error ? saveUserDataServiceCallback(error, null) : saveUserDataServiceCallback(null, data);
        });
    }

    loginUser = (loginData, authenticateUserServiceCallback) => {
        const passwordEnteredByUser = loginData.password;
        
        const userCredentials  = { email: loginData.email, password: loginData.password }
        userModelDB.findOne(userCredentials, (err, data) => {
            return (err) ? authenticateUserServiceCallback(err, null) : authenticateUserServiceCallback(null, data);
        });
    }
}

module.exports = new UserModel();