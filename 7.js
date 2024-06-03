const express = require('express')
const mongoose = require('mongoose')
const bodyParser=require('body-parser')
const Student=require("./model/student")
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
mongoose.connect("mongodb://localhost:27017/students-details-app")
db=mongoose.connection
db.on('error',console.error.bind(console,'connection eror'))
db.once('open',()=>
{
    console.log("connection established")
})
app.get('/',(req,res)=>
{
    res.render('index')
})
app.get('/students',async (req,res)=>{
    try{
    const students=await Student.find()
    res.render('students',{students:students})
    }catch(error)
    {
         res.status(400).send(error)
    }
});
app.post('/students',async(req,res)=>{

    try{
    const students=new Student(req.body)
    await students.save()
    res.redirect('/students')
    }catch(error)
    {
         res.status(400).send(error)
    }
});
app.listen(4000,()=>
{
    console.log("server listening at port no 4000")
})
