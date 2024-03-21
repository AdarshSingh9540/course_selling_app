const { Admin } = require("../db");

function adminMiddleware (req,res,next){

    const username = req.headers.username;
    const password = req.headers.password;

    Admin.findOne({
        username:username,
        password:password
    })

    .then(function(val){
        if(val){
            next();
        }else{
            res.status(403).json({
                msg:"user donesnot exist"
            })
        }
    })
}


module.exports = adminMiddleware;