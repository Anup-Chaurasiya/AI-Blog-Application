const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
} , {
        timestamps: true,
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;