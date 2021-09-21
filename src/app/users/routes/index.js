const  express = require('express')
const router = express.Router();
const user = require('../controller')
const MidAuth = require('../middlewares')
const MidVal = require('../middlewares/validator')


router.post("/user/auth/signin", MidVal.signIn, user.signIn);
router.post("/user/auth/forgetPassword", user.forgetPassword);
router.post("/user/auth/resetpassword", user.resetpassword);

router.post("/user", MidVal.create, user.create);
router.get("/user", MidAuth.requiredSignin,  user.all);
router.get("/user/:userId", MidAuth.requiredSignin, user.single);
router.put("/user/:userId", MidAuth.requiredSignin, MidAuth.isAuthProfile, user.update);
router.delete("/user/:userId", MidAuth.requiredSignin, MidAuth.isAuthProfile, user.delete);

router.param("userId", user.byId)
module.exports = router;