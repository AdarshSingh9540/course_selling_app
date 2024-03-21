const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./route/admin")
const userRouter =  require("./route/user")


app.use(bodyParser.json());
app.use('/admin',adminRouter)
app.use('/user',userRouter)

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`server is runninn on port ${PORT}`)
})