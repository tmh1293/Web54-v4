const PostModel = require('./post-models');
const CommentModel = require('../comment/comment-models');
const getAllPosts = async (req, res) => {
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
}

const getPostById = async (req, res) => {
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
}

const createNewPost = async (req, res) => {
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
}

const updatePost = async (req, res) => {
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
}

const incrementLike = async (req, res) => {
    try{
        const { postId } = req.params;
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
}

const deletePost = async (req, res) => {
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
}

const getComment = async (req, res) => {
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
}

module.exports = {
    getAllPosts,
    getPostById,
    createNewPost,
    updatePost,
    incrementLike,
    deletePost,
    getComment
}