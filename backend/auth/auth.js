

const jwt = require('jsonwebtoken');
let jwtSecretKey = "gfg_jwt_secret_key";

const auth = (req, res, next) => {
    try {
        //  Extract token from Authorization header
        const token = req.headers['authorization'].split(' ')[1];
        
        if(!token){
           res.status(204).json({err : true,
            msg:"send details(token)"})
        }
        // Decoding the token
        const decodedToken = jwt.verify(token, jwtSecretKey);
        console.log(decodedToken,"token")
        // Attach the decoded token to the request for further use
        req.decodedToken = decodedToken;

        next();
    } catch (error) {
        // Handle JWT verification errors
        console.error("JWT verification error:", error.message);
        res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = auth;
