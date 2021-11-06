const express = require('express');
const router = express.Router();
const CommentModel = require('../models/comments-models');


//get all
router.get('/', async (req, res) => {
    try{
        const comments = await CommentModel.find();
        res.send({
            success: 1,
            data: comments
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

//get comment by Id Post
router.get('/:idPost', async (req, res) => {
    try{
        const {idPost} = req.params;
        const foundCommentByPost = await CommentModel.find({ postId: idPost  });

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


//Create Cmt
router.post('/', async (req, res) => {
    try{
        const newCommentData = req.body;

        const newComment = await CommentModel.create(newCommentData);

        res.send({
            success: 1,
            data: newComment
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

//Edit comment
router.put('/:commentId', async (req, res) => {
    try{
        const { commentId } = req.params;
        const updateCommentData = req.body;

        const updatedComment = await CommentModel.findByIdAndUpdate(commentId,updateCommentData, {new: true}); // option new: true để trả về là doc đã đc update

        res.send({
            success: 1,
            data: updatedComment
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

//Delete comment
router.delete('/:commentId', async (req, res) => {
    const {commentId} = req.params;
    try {
        const deletedComment = await CommentModel.findByIdAndDelete(commentId);
        res.send({
            success: 1,
            data: deletedComment
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

module.exports = router;