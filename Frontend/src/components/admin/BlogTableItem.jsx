import React from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog
  const BlogDate = new Date(createdAt)

  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm('Are you sure you want to delete this blog?');
    if (confirm) {
      try {
        const { data } = await axios.post('/api/blog/delete', { id: blog._id });
        if (data.success) {
          toast.success(data.message);
          await fetchBlogs();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  }


  const togglePublish = async () => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id });
      if (data.success) {
        toast.success(data.blog.isPublished ? 'Blog Published ✅' : 'Blog Unpublished ❌');
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <tr className='border-b border-gray-200'>
      {/* Index */}
      <th scope="row" className='px-4 py-3 font-medium text-gray-700'>
        {index}
      </th>

      {/* Blog Title */}
      <td className='px-4 py-3'>{title}</td>

      {/* Date */}
      <td className='px-4 py-3 max-sm:hidden'>
        {blog.createdAt ? new Date(blog.createdAt).toDateString() : 'N/A'}
      </td>

      {/* Status */}
      <td className='px-4 py-3 max-sm:hidden'>
        <p className={`${blog.isPublished ? 'text-green-600' : 'text-orange-700'}`}>
          {blog.isPublished ? 'Published' : 'Unpublished'}
        </p>
      </td>

      {/* Actions */}
      <td className='px-4 py-3 flex items-center gap-3 text-xs'>
        <button onClick={togglePublish} className='border px-2 py-1 rounded cursor-pointer hover:bg-gray-100'>
          {blog.isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <img
          src={assets.cross_icon}
          className='w-5 hover:scale-110 cursor-pointer transition-all'
          alt="delete" onClick={deleteBlog}
        />
      </td>
    </tr>
  )
}

export default BlogTableItem
