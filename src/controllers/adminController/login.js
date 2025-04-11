const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("./../../models/UserModel")
require("dotenv").config()

const loginController = async(req, res) =>{
    try{
        const { username, password } = req.body;
        const existingUser = await userModel.findOne({ username: username });
        if (!existingUser) {
            res.status(301).json({ message: "Invalid Username !!" });
            return;
        }

        const result = await bcrypt.compare(password, existingUser.password);


        if (!result) {
            res.status(401).json({ message: "Password Incorrect !!" });
            return;
        }
        
        const token = await jwt.sign(
            { role:"admin" },
            process.env.JWT_TOKEN,
            { expiresIn: "15min" }
        );
        
        res.cookie("jwtToken", token, {
            secure: true,
            httpOnly: true,
            sameSite: "None",
            maxAge: 60 * 15 * 1000,
        });

        res.status(200).json({"message":"User Login Successfully"})

    }catch(e){
        console.log(e)
        res.status(500).json({"message":"Internal Server Error"})
    }
}
module.exports = loginController