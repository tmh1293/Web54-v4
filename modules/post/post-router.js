const express = require('express');
const router = express.Router();
const postController = require('./post-controller');

router.get('/', postController.getAllPosts)
router.get('/:postId', postController.getPostById)
router.post('/',postController.updatePost)
router.put('/:postId',postController.updatePost)
router.put('/:postId/like', postController.incrementLike)
router.delete('/:postId', postController.deletePost)
router.get('/:idPosts/comments', postController.getComment)

module.exports = router;