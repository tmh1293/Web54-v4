const mongoose = require('mongoose');
const express = require('express');

const app = express();

const postRouter = require('./modules/post/post-router');
const commentRouter = require('./modules/comment/comment-router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts',postRouter);
app.use('/api/comments',commentRouter);



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



