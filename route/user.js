const {Router} = require('express');
const userMiddleware = require('../middleware/user');
const { User, Course } = require('../db');
const router = Router();

router.post('/signup',(req,res)=>{
    const username  = req.body.username;
    const password = req.body.password;

    User.create({
        username,
        password
    })

    res.json({
        msg:"User create successfully"
    })
})

router.get('/courses',async(req,res)=>{
    const response = await Course.find({});

    res.json({
        Course:response
    })
})

router.post('/courses/:coursesId',userMiddleware,async(req,res)=>{
    const courseId = req.params.coursesId;
    const username = req.headers.username;

   await User.updateOne({
    username:username
    },
    {
       "$push":{
        purchaseCourses:courseId
       }
    })
    res.json({
        msg:"Purchase successfully"
    })
})

router.get('/purchasedCourses',userMiddleware,async(req,res)=>{
    const user = await User.findOne({
        username:req.headers.username
    });

    console.log(user.purchaseCourses)
    const courses = await Course.find({
        _id:{
            "$in":user.purchaseCourses
        }
    })
    res.json({
        courses:courses
    })
})

module.exports = router