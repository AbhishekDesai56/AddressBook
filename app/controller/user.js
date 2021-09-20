const service = require('../service/user');
const helper = require('../util/helper');
const validInput = require("../util/userValidation");

class UserController {
    saveUserData = async (req, res) => {
        const userValidInput = validInput.validate(req.body);
        if (userValidInput.error) {
            return res.status(helper.httpStatusCodeEnum.BAD_REQUEST).json({
                success: false,
                message: userValidInput.error.message
            })
		} 

        const hashedPassword = await helper.securePassword(req.body.password);
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        };

        service.registerUser(userData, (err, data) => {
            if (err) {
                return res.status(helper.httpStatusCodeEnum.BAD_REQUEST).json({
                    success: false,
                    message: err.message
                });
            } 

            return res.status(helper.httpStatusCodeEnum.CREATED).json({
                success: true,
                message: "User Data has been save successfully",
            });
        });
    }

    login = (req, res) => {
        const loginDetails = {
            email: req.body.email,
            password: req.body.password,
        };

        service.loginUser(loginDetails, (err, data) => {
            if (err) {
                return res.status(helper.httpStatusCodeEnum.BAD_REQUEST).json({ 
                    success: false, 
                    message: err,
                });
            } 
            return res.status(helper.httpStatusCodeEnum.OK).json({
                success: true,
                message: "User logged in successfully",
                token: helper.generateToken(data),
            });
        });
    };
}

module.exports = new UserController();