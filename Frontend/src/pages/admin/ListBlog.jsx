import React from 'react'
import { useState, useEffect } from 'react'
import { blog_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';

const ListBlog = () => {

    const [blogs, setBlogs] = useState([]);
    const {axios} = useAppContext();

    const fetchBlogs = async () => {
        try {
            const {data} = await axios.get('/api/admin/blogs');
            if(data.success) {
                setBlogs(data.blogs);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div className='flex-1 pt-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
            <h1>All Blogs</h1>

            <div className='relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-gray-600 uppercase bg-gray-100 border-b'>
                        <tr>
                            <th scope='col' className='px-4 py-3 text-left'>#</th>
                            <th scope='col' className='px-4 py-3 text-left'>Blog Title</th>
                            <th scope='col' className='px-4 py-3 text-left max-sm:hidden'>Date</th>
                            <th scope='col' className='px-4 py-3 text-left max-sm:hidden'>Status</th>
                            <th scope='col' className='px-4 py-3 text-left'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {blogs.map((blog, index) => (
                            <BlogTableItem
                                key={blog._id}
                                blog={blog}
                                fetchBlogs={fetchBlogs}
                                index={index + 1}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ListBlog
