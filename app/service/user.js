const model = require("../model/user");

class UserService {
    registerUser = (userData, saveUserDataCallback) => {
        model.createDetails(userData, (err, data) => {
            return (err) ? saveUserDataCallback(err, null) : saveUserDataCallback(err, data);
        });
    }

    loginUser = (loginDetails, authenticateUser) => {
        model.loginUser(loginDetails, (err, data) => {
            return (err) ? authenticateUser(err, null) : authenticateUser(null, data);
        });
    }
}

module.exports = new UserService();