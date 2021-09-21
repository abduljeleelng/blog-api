const jwt = require("jsonwebtoken");
require('dotenv').config();
const models = require('../../../models');

exports.create= async (req, res)=>{
    try {
        const isExist = await models.User.findOne({where:{email:req.body.email}})
        if(isExist){
            return res.status(403).json({error:"you are already registered, you can login"})
        }
        const user = await models.User.create(req.body);
        if(user){
            return res.status(200).json({message:"user successfully created", data:user})
        }else{
            return res.status(401).json({error:"error in creating data"})
        }
    } catch (error) {
        return res.status(402).json({error:"error in creating data", err:error})
    }
}

exports.byId= async (req, res, next, id)=>{
    try {
        const user = await models.User.findByPk(id, {
            include:['comment', 'post']
        });
        if(user){
            user.password=undefined;
            req.user = user
            next()
        }else{
            return res.status(401).json({error:"invalid user !!"})
        }
    } catch (error) {
        return res.status(402).json({error:"error in fetching data", err:error})  
    }
}

exports.single = async (req, res)=>{
    try {
        return res.status(200).json({message:"user successfully fetched", data:req.user})
    } catch (error) {
        return res.status(402).json({error:"error in fetching data", err:error})  
    }
}

exports.all = async (req, res)=>{
    try {
        const user = await models.User.findAll({include:['comment', 'post']});
        if(Array.isArray(user) && user.length){
            return res.status(200).json({message:"user successfully fetched", data:user})
        }else{
            return res.status(401).json({error:"error in fetching  data"})
        }
    } catch (error) {
        return res.status(402).json({error:"error in fetching data", err:error, /*errorMessage:error.errors[0].message*/})  
    }
}

exports.delete = async (req, res)=>{
    try {
        const del = await models.User.destroy({where:{id:req.user.id}})
        if(del){
            return res.status(200).json({message:"user successfully deleted", data:req.user})
        }else{
            return res.status(401).json({error:"error in deleting user"})
        } 
    } catch (error) {
        return res.status(402).json({error:"error in creating data", err:error})  
    }
}

exports.update = async (req, res)=>{
    try {
        const updated = await models.User.update(req.body, {where:{id:req.user.id}})
        if(updated){
            return res.status(200).json({message:"user successfully updated"})
        }else{
            return res.status(401).json({error:"error in updating the user"})
        }
    } catch (error) {
        return res.status(402).json({error:"error in updating", err:error})  
    }
}

exports.signIn = async (req, res)=>{
    try {
        const {password, email} = req.body;
        const user = await models.User.findByLogin(email);
        if(!user){
            return res.status(400).json({error:"invalid email"})
        }
        const isValid = await models.User.validatePassword(password, user.password)
        if(!isValid){
            return res.status(400).json({error:"invalid Password"})
        }
        const token = jwt.sign(
            { id: user.id, role:"", user:user },
            process.env.JWT_SECRET
        );

        user.password=undefined;
        return res.status(200).json({message:"success", token, data:user})
    } catch (error) {
        return res.status(402).json({error:"error in signin user", err:error})  
    }
}

exports.forgetPassword = async (req, res)=>{
    try {
        const {password, email} = req.body;
        const user = await models.User.findByLogin(email);
        if(user){
            //generate the forget token, send email to the user to reset the password
            return res.status(200).json({message:"request successfully process", data:user})
        }else{
            return res.status(401).json({error:"error in p[rocess the request"})
        } 
    } catch (error) {
        return res.status(402).json({error:"error in processing the request", err:error, })  
    }
}

exports.resetpassword = async (req, res)=>{
    try {
        const {password, email} = req.body;
        const user = await models.User.findByLogin(email);
        if(user){
            //update the DB with new passsword, send email notification to the user
            return res.status(200).json({message:"password sucessfully reset", data:user})
        }else{
            return res.status(401).json({error:"error in processing data"})
        }
    } catch (error) {
        return res.status(402).json({error:"error in ", err:error})  
    }
}