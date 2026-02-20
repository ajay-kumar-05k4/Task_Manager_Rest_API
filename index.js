const express=require('express');
const app=express();
app.use(express.static('public'));

app.use(express.json());
const tasks=[];
app.get('/',(req,res)=>{
    res.send('Welcome to the Task Manager API');
});
  
app.listen(5000,()=>{
    console.log('Server is running on port http://localhost:5000');
});
app.get('/tasks',(req,res)=>{
    res.json(tasks);
});
app.post('/tasks',(req,res)=>{
    const {title,description}=req.body;
    const newTask={id:tasks.length+1,title,description};
    tasks.push(newTask);
    res.status(201).json(newTask);
});
 
app.put('/tasks/:id',(req,res)=>{
    const taskId=parseInt(req.params.id);
    const {title,description}=req.body;
    const task=tasks.find(t=>t.id===taskId);
    if(task){
        task.title=title;
        task.description=description;
        res.json(task);
    }else{
        res.status(404).json({message:'Task not found'});
    }
});
app.delete('/tasks/:id',(req,res)=>{
    const taskId=parseInt(req.params.id);
    const taskIndex=tasks.findIndex(t=>t.id===taskId);
    if(taskIndex!==-1){
        tasks.splice(taskIndex,1);
        res.json({message:'Task deleted successfully'});
    }else{
        res.status(404).json({message:'Task not found'});
    }

});

