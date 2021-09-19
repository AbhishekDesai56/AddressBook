const model = require("../model/user");

class UserService {
    registerUser = (userData, saveUserDataCallback) => {
        model.createDetails(userData, (err, data) => {
            return (err) ? saveUserDataCallback(err, null) : saveUserDataCallback(err, data);
        });
    }
}

module.exports = new UserService();