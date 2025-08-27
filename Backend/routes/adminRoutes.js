const express = require('express');
const adminRouter = express.Router();
const auth = require('../middleware/auth');

const {adminLogin, getAllBlogs, getAllComments, getDashboard, deleteCommentById, approveCommentById} = require('../controllers/adminController');

adminRouter.post('/login', adminLogin);
adminRouter.get('/blogs', auth, getAllBlogs);
adminRouter.get('/comments', auth, getAllComments);
adminRouter.get('/dashboard', auth, getDashboard);
adminRouter.delete('/delete-comment', auth, deleteCommentById);
adminRouter.put('/approve-comment', auth, approveCommentById);

module.exports = adminRouter;
