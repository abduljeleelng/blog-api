const expressJWT = require('express-jwt');
require("dotenv").config();

exports.requiredSignin = expressJWT({
    algorithms:['sha1', 'RS256', 'HS256'],
    secret:process.env.JWT_SECRET,
    requestProperty: 'auth'
})

exports.isAuthProfile= (req, res,next) => {
    //console.log(JSON.stringify({user:req.user, toke:req.auth}))
    const authorised = req.user && req.auth && req.user.id === req.auth.user.id
    if(!authorised) return res.status(401).json({error:"You don't have permission, contact system administrator"})
    next()
}

exports.isPostOwner= (req, res,next) =>{
    const authorised = req.post && req.auth && req.post.user.id === req.auth.user.id
    if(!authorised) return res.status(401).json({error:"You don't have permission, contact system administrator"})
    next()
}

exports.isCommentOwner= (req, res,next) =>{
    console.log(JSON.stringify({user:req.comment, toke:req.auth}))
    const authorised = req.comment && req.auth && req.comment.user.id === req.auth.user.id
    if(!authorised) return res.status(401).json({error:"You don't have permission, contact system administrator"})
    next()
}
