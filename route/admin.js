const {Router} = require('express');

const adminMiddleware = require('../middleware/admin');
const { Admin, Course } = require('../db');
const router = Router();


router.post("/signup",async (req,res)=>{
    const username  = req.body.username;
    const password = req.body.password;

   await Admin.create({
        username:username,
        password:password
    })
        res.json({
        msg:"Admin create successfully ..! Welcome to Express"
        })

 
})

router.post('/courses' ,adminMiddleware,async (req,res)=>{
    const title = req.body.title;
    const imgLink = req.body.imgLink;
    const description =req.body.description;
    const price = req.body.price;

const newCourse =  await  Course.create({
        title,
        imgLink,
        description,
        price
    })

    res.json({
        msg:"Course created successfully",courseId: newCourse._id
    })
})

router.get("/courses",adminMiddleware,async (req,res)=>{
 
    const response = await Course.find({});

    res.json({
        Course:response
    })
})

module.exports = router;