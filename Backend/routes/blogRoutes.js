const express = require('express');
const blogRouter = express.Router();
const {createBlog, getAllBlogs, getBlogById, deleteBlog, togglePublish, addComment, getAllComments, generateContent} = require('../controllers/blogController');
const upload = require('../middleware/multer');
const auth = require('../middleware/auth');

blogRouter.post('/add', upload.single('image') , auth, createBlog);
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:id', getBlogById);
blogRouter.post('/delete', auth, deleteBlog);
blogRouter.post('/toggle-publish', auth, togglePublish);

blogRouter.post('/add-comment/', addComment);
blogRouter.post('/comments', getAllComments);
blogRouter.post('/generate', auth, generateContent);


module.exports = blogRouter;
