const router = require('express').Router();
const { Blog } = require('../../models');
const Auth = require('../../utils/auth');

// new post
router.post('/', Auth, async (req, res) => {
    try {
        const newPost = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update post
router.put('/edit/:id', Auth, async (req, res) => {
    try {
        const { id } = req.params
        const { title, content } = req.body;
        const blog = await Blog.findOne({
            where: {
                id: id,
            }
        });
        if (!blog) {
            res.status(404).end("Check blog id again.");
            return;
        }
        await blog.update({
            title, content,
        });
        res.status(200).json(blog);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete post
router.delete('/delete/:id', Auth, async (req, res) => {
    try {
        const { id } = req.params
        const blogData = await Blog.destroy({
            where: {
                id: id,
            }
        });
        if (!blogData) {
            res.status(404).json({ message: 'Check blog id again.' });
            return;
        }
        res.status(200).json(blogData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
