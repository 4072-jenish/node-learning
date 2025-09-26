const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');


exports.verifyToken = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.json({message: "Authoriazation missing"});
    }
    let token = authorization.split(" ")[1];
    if(token){
        let {userId} = jwt.verify(token, process.env.SECRET_KEY);

        let user = await UserModel.findById(userId)
        if(user){
            req.user = user;
            next();
        }else{
            return res.json({status: 401, message: "InValid User Token" })
        }
    }else{
        return res.json({status: 400, message: "token missing"});
    }

}