import React, { use } from 'react'
import { useState, useEffect, useRef } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { parse } from 'marked'


const AddBlog = () => {

    const { axios } = useAppContext();
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);


    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const [image, setImage] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('Startup');
    const [isPublished, setIsPublished] = useState(false);

    const generateContent = async () => {
        if (!title) {
            toast.error('Title is required');
            return;
        }
        try {
            setLoading(true);
            const { data } = await axios.post('/api/blog/generate', { prompt: title });
            if (data.success) {
                quillRef.current.root.innerHTML = parse(data.response);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsAdding(true);

            const formData = new FormData();
            formData.append('title', title);
            formData.append('subTitle', subTitle);
            formData.append('description', quillRef.current.root.innerHTML);
            formData.append('category', category);
            formData.append('isPublished', isPublished);
            formData.append('image', image);

            const { data } = await axios.post('/api/blog/add', formData);

            if (data.success) {
                toast.success('Blog created successfully!');
                setTitle('');
                setSubTitle('');
                setCategory('Startup');
                setImage(false);
                quillRef.current.root.innerHTML = '';
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsAdding(false);
        }
    };


    useEffect(() => {
        if (!quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            })
        }
    }, [])

    return (
        <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-y-scroll'>
            <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow-rounded'>

                <p>Upload thumbnail</p>
                <label htmlFor="image">
                    <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </label>

                <p className='mt-4'>Blog Title</p>
                <input className='w-full border border-gray-300 mt-2 p-2 max-w-lg outline-none rounded' type="text" placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} required />

                <p className='mt-4'>Sub Title</p>
                <input className='w-full border border-gray-300 mt-2 p-2 max-w-lg outline-none rounded' type="text" placeholder='Enter sub title' value={subTitle} onChange={(e) => setSubTitle(e.target.value)} required />

                <p className='mt-4'>Blog Description</p>
                <div className='max-w-lg h-72 pb-16 sm:pb-10 pt-2 relative'>
                    <div ref={editorRef}></div>
                    {loading && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
                            <div className="h-10 w-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                    )}
                    <button disabled={loading} type='button' onClick={generateContent} className='absolute right-2 bottom-2 bg-primary text-white px-4 py-1 rounded cursor-pointer'>
                        Generate with AI</button>
                </div>

                <p className='mt-4'>Blog Category</p>
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    name="category"
                    className="w-full border text-gray-500 border-gray-300 mt-2 p-2 max-w-lg outline-none rounded"
                    value={category}
                    required
                >
                    <option value="">Select Category</option>
                    {blogCategories.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>


                <div className='flex gap-2 mt-4'>
                    <input className='cursor-pointer' type="checkbox" id="isPublished" name="isPublished" value={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
                    <label className='sclae-125' htmlFor="isPublished">Publish Now</label>
                </div>

                <button disabled={isAdding} type='submit' className='bg-primary cursor-pointer text-white px-4 py-2 rounded mt-4'>
                    {isAdding ? 'Adding...' : 'Add Blog'}</button>

            </div>

        </form>
    )
}

export default AddBlog
