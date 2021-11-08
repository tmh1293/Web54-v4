const CommentModel = require('./comment-models');

const getAllComments = async (req, res) => {
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
}

const postComments = async (req, res) => {
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
}

const editComment = async (req, res) => {
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
}

const deleteComment = async(req, res) => {
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
}

module.exports = {
    getAllComments,
    postComments,
    editComment,
    deleteComment
}