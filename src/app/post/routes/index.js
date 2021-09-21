const  express = require('express')
const router = express.Router();
const post = require('../controller')
const MidAuth = require('../middlewares')
const MidVal = require('../middlewares/validator')


router.post("/post", MidVal.create, MidAuth.requiredSignin, post.create);
router.get("/post",  post.all);
router.get("/post/:postId", MidAuth.requiredSignin, MidAuth.isPostOwner,  post.single);
router.put("/post/:postId", MidAuth.requiredSignin, MidAuth.isPostOwner, post.update);
router.delete("/post/:postId", MidAuth.requiredSignin, MidAuth.isPostOwner, post.delete);
//comment services endpoint 
router.post("/post/:postId/comment", MidAuth.requiredSignin, post.comment);
router.get("/comment/:commentId", MidAuth.requiredSignin,   post.singleComment);
router.put("/comment/:commentId", MidAuth.requiredSignin, MidAuth.isCommentOwner, post.updateComment);
router.delete("/comment/:commentId", MidAuth.requiredSignin, MidAuth.isCommentOwner, post.deleteComment);


router.param("postId", post.byId)
router.param("commentId", post.commentById)
module.exports = router;