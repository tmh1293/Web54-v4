const mongoose = require('mongoose');
const express = require('express');

const app = express();

const postsRouter = require('./router/posts-router');
const commentsRouter = require('./router/comments-router');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts',postsRouter);
app.use('/api/comments',commentsRouter);



app.listen(8080, (err)=>{
    if(err) throw err;
    console.log("Server connected on port 8080")
});


mongoose.connect('mongodb://localhost:27017/mindx-web54',
{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}).then(()=>{
    console.log("MongoDB Connected");
}).catch(err => console.log(err))



