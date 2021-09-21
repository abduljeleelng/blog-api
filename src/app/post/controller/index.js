const jwt = require("jsonwebtoken");
require('dotenv').config();
const models = require('../../../models');

exports.create= async (req, res)=>{
    try {
        const {user}= req.auth;
        const {contents} = req.body;
        const payload = {contents, userId:user.id}
        const post = await models.Post.create(payload);
        if(post){
            return res.status(200).json({message:"user successfully created", data:post})
        }else{
            return res.status(401).json({error:"error in creating data"})
        }
    } catch (error) {
        return res.status(402).json({error:"error in creating data", err:error})
    }
}

exports.byId= async (req, res, next, id)=>{
    try {
        const post = await models.Post.findByPk(id, {
            include:['comment', 'user']
        });
        if(post){
            req.post = post
            next()
        }else{
            return res.status(401).json({error:"invalid post id"})
        }
    } catch (error) {
        return res.status(402).json({error:"error in fetcing post", err:error, errorMessage:error.errors[0].message})  
    }
}

exports.single = async (req, res)=>{
    try {
        return res.status(200).json({message:"post successfully fetched", data:req.post})
    } catch (error) {
        return res.status(402).json({error:"error in creating data", err:error, errorMessage:error.errors[0].message})  
    }
}

exports.all = async (req, res)=>{
    try {
        const post = await models.Post.findAll({
            order:[
                ['id', 'DESC'],
            ],
            include:['comment', 'user']
        });
        if(Array.isArray(post) && post.length){
            return res.status(200).json({message:"post successfully fetched", data:post})
        }else{
            return res.status(401).json({error:"error in fetching data"})
        }
    } catch (error) {
        return res.status(402).json({error:"error in fetching posts", err:error, /*errorMessage:error.errors[0].message*/})  
    }
}

exports.page = async (req, res)=>{
    try {
        const post = await models.Post.findAll({
            order:[
                ['id', 'DESC'],
            ],
            limit: 10, 
            include:['comment', 'user']
        });
        if(Array.isArray(post) && post.length){
            return res.status(200).json({message:"post successfully fetched", data:post})
        }else{
            return res.status(401).json({error:"error in fetching data"})
        }
    } catch (error) {
        return res.status(402).json({error:"error in fetching posts", err:error, /*errorMessage:error.errors[0].message*/})  
    }
}

exports.delete = async (req, res)=>{
    try {
        const post = await models.Post.destroy({where:{id:req.post.id}})
        if(post){
            return res.status(200).json({message:"user successfully deleted post"})
        }else{
            return res.status(401).json({error:"error in creating data"})
        } 
    } catch (error) {
        return res.status(402).json({error:"error in deleting data", err:error})  
    }
}

exports.update = async (req, res)=>{
    try {
        const post = models.Post.update(req.body, {where:{id:req.post.id}})
        if(post){
            return res.status(200).json({message:"user successfully updated a post",})
        }else{
            return res.status(401).json({error:"error in updating post"})
        }
    } catch (error) {
        return res.status(402).json({error:"error in updating post", err:error, errorMessage:error.errors[0].message})  
    }
}

exports.comment = async (req, res)=>{
    try {
        const payload = {text:req.body.text, postId:req.post.id, userId:req.auth.user.id}
        const com = await models.Comment.create(payload)
        if(com){
            return res.status(200).json({message:"user successfully comment on a post",data:com})
        }else{
            return res.status(401).json({error:"error in comment post"})
        }
    } catch (error) {
        return res.status(402).json({error:"error in comment on post", err:error,})
    }
}

exports.commentById = async (req, res, next, id)=>{
    try {
        const com = await models.Comment.findByPk(id, {
            include:['user','post']
        })
        if(com){
            req.comment = com
            next()
        }else{
            return res.status(401).json({error:"error in get comment"})
        }
    } catch (error) {
        return res.status(402).json({error:"error in comment", err:error,})
    }
}

exports.singleComment = async (req, res)=>{
    try {
        return res.status(200).json({message:"comment successfully fetched", data:req.comment})
    } catch (error) {
        return res.status(402).json({error:"error in fetching data", err:error, errorMessage:error.errors[0].message})  
    }
}

exports.deleteComment = async (req, res)=>{
    try {
        const del = await models.Comment.destroy({where:{id:req.comment.id}})
        if(del){
            return res.status(200).json({message:"user successfully deleted comment"})
        }else{
            return res.status(401).json({error:"error in deleting data"})
        }    
    } catch (error) {
        return res.status(402).json({error:"error in creating data", err:error})  
    }
}

exports.updateComment = async (req, res)=>{
    try {
        const com = models.Comment.update(req.body, {where:{id:req.comment.id}})
        if(com){
            return res.status(200).json({message:"user successfully updated a comment",})
        }else{
            return res.status(401).json({error:"error in updating comment"})
        }
    } catch (error) {
        return res.status(402).json({error:"error in creating data", err:error})  
    }
}



