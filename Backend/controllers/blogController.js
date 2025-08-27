const Blog = require('../models/blog');
const Comment = require('../models/comment');
const imagekit = require('../configs/imageKit');
const { main } = require('../configs/gemini');

const createBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = req.body;
        const imageFile = req.file;

        if (!title || !subTitle || !description || !category || !imageFile) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const uploadResponse = await imagekit.upload({
            file: imageFile.buffer,
            fileName: imageFile.originalname,
            folder: 'blogs',
        });

        const optimizedImageURL = imagekit.url({
            path: uploadResponse.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: '800' }
            ]
        });

        const blog = await Blog.create({
            title,
            subTitle,
            description,
            category,
            image: optimizedImageURL,
            isPublished: isPublished === 'true'
        });

        return res.status(201).json({ success: true, blog });
    } catch (error) {
        console.error('Error creating blog:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true });
        return res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        return res.status(200).json({ success: true, blog });
    } catch (error) {
        console.error('Error fetching blog:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ success: false, message: 'Blog ID required' });

        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        // delete associated comments
        await Comment.deleteMany({ blog: id });

        return res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ success: false, message: 'Blog ID required' });

        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        blog.isPublished = !blog.isPublished;
        await blog.save();
        return res.status(200).json({ success: true, blog });
    } catch (error) {
        console.error('Error toggling publish status:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


const addComment = async (req, res) => {
    try {
        const { blogId, name, content } = req.body;  // match frontend
        if (!blogId || !name || !content) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        await Comment.create({ blog: blogId, name, content });
        return res.status(201).json({ success: true, message: 'Comment added successfully' });
    } catch (error) {
        console.error('Error adding comment:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


const getAllComments = async (req, res) => {
    try {
        const { blogid } = req.body;
        const comments = await Comment.find({ blog: blogid, isApproved: true }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ success: false, message: 'Prompt is required' });
        }
        const topic = prompt;
        const response = await main(
            `Write a detailed blog post on the topic: "${topic}". 
  - Use simple, easy-to-understand language. 
  - Include an engaging introduction, main content divided into sections, and a concise conclusion. 
  - Do not include any HTML or special formatting—plain text only. 
  - Make it informative, professional, and reader-friendly.`
        );
        return res.status(200).json({ success: true, response });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = { createBlog, getAllBlogs, getBlogById, deleteBlog, togglePublish, addComment, getAllComments, generateContent };
