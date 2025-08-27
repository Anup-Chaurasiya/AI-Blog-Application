// import React from 'react'
// import { assets, blogCategories } from '../assets/assets'
// import { motion } from 'motion/react'
// import BlogCard from './BlogCard'
// import { useAppContext } from '../context/AppContext'
// import { useState } from 'react'


// const BlogList = () => {

//     const [menu, setMenu] = useState('All')
//     const {blogs, input} = useAppContext();

//     const filterBlogs =() =>{
//         if(input === ''){
//             return blogs;
//         }
//         return blogs.filter(blog => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()));
//     }

//     return (
//         <div>
//             <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
//                 {blogCategories.map((item, index) => (
//                     <div key={index} className="relative">
//                         <button onClick={() => setMenu(item)} className={`px-4 py-2 rounded-full text-sm transition-all cursor-pointer ${menu === item ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
//                             {item}
//                             {menu === item && (
//                                 <motion.span layoutId='underline'
//                                     transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//                                     className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></motion.span>
//                             )}
//                         </button>
//                     </div>
//                 ))}


//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
//                 {filterBlogs()
//                     .filter((blog) => menu === 'All' || blog.category === menu)
//                     .map((blog) => (
//                         <BlogCard key={blog._id} blog={blog} />
//                     ))}
//             </div>
//         </div>
//     )
// }

// export default BlogList


import React, { useState } from 'react'
import { assets, blogCategories } from '../assets/assets'
import { motion } from 'motion/react'
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'

const BlogList = () => {
    const [menu, setMenu] = useState('All')
    const { blogs = [], input = '' } = useAppContext() || {};  // ✅ default safe values

    const filterBlogs = () => {
        if (!Array.isArray(blogs)) return []; // ✅ guard
        if (input === '') {
            return blogs;
        }
        return blogs.filter(blog => 
            blog?.title?.toLowerCase().includes(input.toLowerCase()) || 
            blog?.category?.toLowerCase().includes(input.toLowerCase())
        );
    };

    return (
        <div>
            <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
                {blogCategories.map((item, index) => (
                    <div key={index} className="relative">
                        <button 
                            onClick={() => setMenu(item)} 
                            className={`px-4 py-2 rounded-full text-sm transition-all cursor-pointer ${menu === item ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            {item}
                            {menu === item && (
                                <motion.span 
                                    layoutId='underline'
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
                                />
                            )}
                        </button>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
                {(filterBlogs() || [])   // ✅ always array
                    .filter((blog) => menu === 'All' || blog?.category === menu)
                    .map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
            </div>
        </div>
    )
}

export default BlogList

