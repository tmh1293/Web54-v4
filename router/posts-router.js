const express = require('express');
const router = express.Router();
const PostModel = require('../models/posts-models');
const CommentModel = require('../models/comments-models');

//get all
router.get('/', async (req, res) => {
    try{
        const posts = await PostModel.find();
        res.send({
            success: 1,
            data: posts
        })
    }
    catch (err) {
        res.status(400).send({
            success: 0,
             data: null,
              message: err.message || 'Something went wrong'
            })
    }
})

//get post by id
router.get('/:postId', async (req, res) => {
    try{
        const {postId} = req.params;
        const foundPosts = await PostModel.findById(postId);
        res.send({
            success: 1,
            data: foundPosts
        })
    }
    catch (err) {
        res.status(400).send({
            success: 0,
             data: null,
              message: err.message || 'Something went wrong'
            })
    }
})

// Create new post
router.post('/', async (req, res) => {
    try{
        const newPostData = req.body;

        const newPost = await PostModel.create(newPostData);

        res.send({
            success: 1,
            data: newPost
        })
    }
    catch (err) {
        res.status(400).send({
            success: 0,
             data: null,
              message: err.message || 'Something went wrong'
            })
    }
})

//Update - edit post
router.put('/:postId', async (req, res) => {
    try{
        const { postId } = req.params;
        const updatePostData = req.body;

        const updatedPost = await PostModel.findByIdAndUpdate(postId,updatePostData, {new: true}); // option new: true để trả về là doc đã đc update

        res.send({
            success: 1,
            data: updatedPost
        })
    }
    catch (err) {
        res.status(400).send({
            success: 0,
             data: null,
              message: err.message || 'Something went wrong'
            })
    }
})

router.put('/:postId/like', async (req, res) => {
    try{
        //người dùng gửi request => tăng like thêm 1 lần
        // tìm hiểu $inc trong mongodb
        const { postId } = req.params;
        const updateLike = req.body;
        const incrementLike = await PostModel.updateOne(
            { _id: postId },
            { $inc: { likeCount: 1 } }
        );

        res.send({
            success:1,
            data: incrementLike
        })
    }
    catch (err) {
        res.status(400).send({
            success: 0,
             data: null,
              message: err.message || 'Something went wrong'
            })
    }
})

//delete post
router.delete('/:postId', async (req, res) => {
    const {postId} = req.params;
    try {
        const deletedPost = await PostModel.findByIdAndDelete(postId);
        res.send({
            success: 1,
            data: deletedPost
        })
    }
    catch(err) {
        res.status(400).send({
            success: 0,
            data: null,
            message: err.message || 'Something went wrong'
        })
    }
})

router.get('/:idPosts/comments', async (req, res) => {
    try{
        const {idPosts} = req.params;
        const foundCommentByPost = await CommentModel.find({ postId: idPosts  });
        res.send({
            success: 1,
            data: foundCommentByPost
        })
    }
    catch (err) {
        res.status(400).send({
            success: 0,
             data: null,
              message: err.message || 'Something went wrong'
            })
    }
})

module.exports = router;