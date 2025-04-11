const bcrypt = require("bcrypt")
const userModel = require("./../../models/UserModel")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const addAdminController = async(req, res) =>{
    try{
        const {username, password} = req.body;

        const hashPassword = await bcrypt.hash(password, 11);
        
        const newAdmin = new userModel({
            username,
            password: hashPassword
        })

        await newAdmin.save();
        res.status(201).json({"message":"admin created"});
    }catch(e){
        console.log(e);
        res.status(500).json({"message":"Internal server error"});
    }
    
}
module.exports = addAdminController;