const model = require("../model/user");
const helper = require('../util/helper');

class UserService {
    registerUser = (userData, saveUserDataCallback) => {
        model.createDetails(userData, (err, data) => {
            return (err) ? saveUserDataCallback(err, null) : saveUserDataCallback(err, data);
        });
    }

    loginUser = (loginDetails, authenticateUser) => {
        model.loginUser(loginDetails, (err, data) => {
             if (err) { 
                 return authenticateUser(err, null) 
                } else {
                const token = helper.generateToken(loginDetails);
                return authenticateUser(null, token);
            } 
        });
    }
}

module.exports = new UserService();