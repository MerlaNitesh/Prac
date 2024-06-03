const  express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json())

const Schema=new mongoose.Schema({
    id:Number,
    name:String,
    branch:String
})
const stds=mongoose.model('std1',Schema)
mongoose.connect("mongodb://localhost:27017/student");
app.get('/students',async(req,res)=>
{
      const stud=await stds.find();
      res.json(stud);
})
app.post('/students',async(req,res)=>
{
    const st=new stds({
        id:parseInt(req.body.id),
        name:req.body.name,
        branch:req.body.branch
    });
    await st.save();
    res.send('student with ${id} added');
})
app.put('/students/:id',async(req,res)=>
{
    const id=parseInt(req.params.id)
    const stu=await stds.findOneandUpdate({id:sid},req.body,{new:true})
    if(!stu)
        res.send("student no found");
    res.send(stu);
})
app.put('/students/:id',async(req,res)=>
    {
        const id=parseInt(req.params.id)
        const stu=await stds.findOneandDelete({sid:id})
        if(!stu)
            res.send("student no found");
        res.send(`student with ${id}deleted`);
    })
    app.listen(4000,(req,res)=>
        {
            console.log("server listening at port no 4000")
        })