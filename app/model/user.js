const mongoose = require("mongoose");
const helper = require("../util/helper");

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

    loginUser =  (loginData, authenticateUserServiceCallback) => {
        const userCredentials  = { email: loginData.email}
        userModelDB.find(userCredentials, async (err, data) => {
            if (err) {
               return authenticateUserServiceCallback(err, null)
            } else {
                const hash = await userModelDB.findOne(userCredentials);
                if(hash === null)
                    return authenticateUserServiceCallback("Invalid User Credentials", null);

                const isPasswordMatch = await helper.decryptPassword(loginData.password, hash.password);
                if (!isPasswordMatch) {
                    return authenticateUserServiceCallback("Password doesn't match!", null);
                } else {
                    return authenticateUserServiceCallback(null, data);
                }
            }
        });
    }
}

module.exports = new UserModel();