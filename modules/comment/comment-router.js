const express = require('express');
const router = express.Router();
const commentController = require('./comment-controller');


router.get('/', commentController.getAllComments )
router.post('/', commentController.postComments)
router.put('/:commentId', commentController.editComment)
router.delete('/:commentId', commentController.deleteComment)

module.exports = router;