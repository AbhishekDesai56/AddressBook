const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Helper {
    httpStatusCodeEnum  = Object.freeze({
        OK : 200,
        CREATED : 201,
        NO_CONTENT : 204,
        BAD_REQUEST : 400,
        NOT_FOUND : 404,
        INTERNAL_SERVER : 500,
        UNAUTHORIZED : 401,
        FORBIDDEN : 403 
    });

    securePassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    
    decryptPassword = async (password, hashedPassword) => {
        return bcrypt.compare(password, hashedPassword);
    }

    generateToken = (data) => {
        return jwt.sign({ data }, process.env.TOKEN_KEY, { expiresIn: "30m" });
    }

    verifyToken = (req, res, next) => {
    const token =  req.get("token") || req.headers.authorization;
    if (!token) {
      return res.status(this.httpStatusCodeEnum.FORBIDDEN).send({
          message: "A token is required for authenication"
      });
    }

    try {
    let removedBearerFromHeaderToken = token.replace("Bearer",'').trim();
      jwt.verify(removedBearerFromHeaderToken, process.env.TOKEN_KEY,{ algorithm: 'RS256' }, (err) => {
          if (err) {
              return res.status(this.httpStatusCodeEnum.BAD_REQUEST).send({
                  success: false,
                  message: "Invalid Token",
              });
          }
      });
    } catch (ex) {
      return res.status(this.httpStatusCodeEnum.UNAUTHORIZED).send({
          message: ex.message,
      });
    }
    return next();
    };
}

module.exports = new Helper();