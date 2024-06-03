const express=require('express')
const app=express()
app.use(express.json())
let students=
[
    {id:1,name:"Nitesh",branch:"cse"},
    {id:2,name:"Rahul",branch:"cse"},
    {id:3,name:"shiva",branch:"cse"}
];
app.get('/students',(req,res)=>
{
    res.send(students)
})
app.post('/students',(req,res)=>
{
    const student={
        id:students.length+1,
        name:req.body.name,
        branch:req.body.branch
    }
    students.push(student);
    res.send(students);
})
app.put('/students/:id',(req,res)=>
{
    id=req.params.id;
    const st = students.find(std => std.id===parseInt(id))
    if(!st)
        res.send("student not found");
    st.branch=req.body.branch;
    res.send(students);
})
app.delete('/students/:id',(req,res)=>
    {
        id=req.params.id;
        const st = students.findIndex(std => std.id===parseInt(id))
        if(!st)
            res.send("student not found");
        students.splice(st,1)
        res.send(students);
    });
    app.listen(3000,(req,res)=>
    {
        console.log("server listening at port no 3000")
    })