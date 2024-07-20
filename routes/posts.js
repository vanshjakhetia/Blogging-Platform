const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

router.post('/create', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        author: req.user._id
    });
    await post.save();
    res.redirect('/');
});

router.post('/edit/:id', async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category
    });
    res.redirect('/');
});

router.post('/delete/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

router.get('/search', async (req, res) => {
    const searchTerm = req.query.q;
    const posts = await Post.find({ $text: { $search: searchTerm } });
    res.render('searchResults', { posts });
});


module.exports = router;
