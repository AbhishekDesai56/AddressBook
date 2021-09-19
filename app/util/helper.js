const bcrypt = require("bcrypt");

class Helper {
    httpStatusCodeEnum  = Object.freeze({
        OK : 200,
        CREATED : 201,
        NO_CONTENT : 204,
        BAD_REQUEST : 400,
        NOT_FOUND : 404,
        INTERNAL_SERVER : 500,
    });

    securePassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    };
    
    decryptPassword = async (password, hashedPassword) => {
        return bcrypt.compare(password, hashedPassword);
    }; 
}

module.exports = new Helper();