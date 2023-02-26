const router = require('express').Router();
const auth = require("../utils/auth")
const { Blog, User, comment } = require('../models');

router.get("/", auth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                  model: User,
                  attributes: ['name'],
                },
            ],
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render("dashboard", {blogs, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/edit/:id', auth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);
        const blog = blogData.get({ plain: true });
        res.render("edit", {blog, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
