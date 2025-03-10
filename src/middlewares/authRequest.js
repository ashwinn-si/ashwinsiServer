require("dotenv").config();

const authRequest = async(req, res, next) => {
    const token = req.headers.authorization;

    if( !token || !token.startsWith("Bearer ")) {
        return res.status(401).json({message: "Unauthorized"});
    }
    const checkToken = token.split(" ")[1];

    if( !checkToken ) {
        return res.status(401).json({message: "Unauthorized"});
    }

    if( checkToken !== process.env.TOKEN ) {
        return res.status(401).json({message: "Unauthorized"});
    }
    next();
}

module.exports = authRequest