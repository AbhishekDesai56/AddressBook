const service = require('../service/user');
const helper = require('../util/helper');

class UserController {
    saveUserData = (req, res) => {
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        };

        service.saveUserDetails(addressBookData, (err, data) => {
            if (err) {
                return res.status(helper.httpStatusCodeEnum.BAD_REQUEST).json({
                    success: false,
                    message: err.message
                });
            } else {
                return res.status(helper.httpStatusCodeEnum.CREATED).json({
                    success: true,
                    message: "User Data has been save successfully",
                });
            }
        });
    }
}