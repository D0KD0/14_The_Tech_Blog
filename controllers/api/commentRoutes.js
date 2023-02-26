const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const Auth = require('../../utils/auth');

// add comment
router.post('/:blog_id', Auth, async (req, res) => {
    try {
        const {blog_id} = req.params;
        const newComment = await Comment.create({
            ...req.body,
            blog_id: blog_id,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

module.exports = router;
