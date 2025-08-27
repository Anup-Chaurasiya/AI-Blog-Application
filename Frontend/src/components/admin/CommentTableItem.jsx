import React from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const CommentTableItem = ({ comment, fetchComments }) => {
  const { axios } = useAppContext()

  const deleteComment = async () => {
    const confirm = window.confirm('Are you sure you want to delete this comment?')
    if (!confirm) return

    try {
      const { data } = await axios.delete('/api/admin/delete-comment', { data: { id: comment._id }})
      if (data.success) {
        toast.success(data.message)
        fetchComments() // refresh comments
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const approveComment = async () => {
    try {
      const { data } = await axios.put('/api/admin/approve-comment', { id: comment._id })  
      if (data.success) {
        toast.success(data.message)
        fetchComments() // refresh comments
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const BlogDate = comment.createdAt ? new Date(comment.createdAt) : null

  return (
    <tr className="border-b border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b> : {comment.blog?.title || 'N/A'}
        <br />
        <b className="font-medium text-gray-600">Name</b> : {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {comment.content}
      </td>

      <td className="px-6 py-4 max-sm:hidden">
        {BlogDate ? BlogDate.toLocaleDateString() : 'N/A'}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          {comment.isApproved ? (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          ) : (
            <img
              src={assets.tick_icon}
              alt="approve"
              className="w-5 hover:scale-110 transition cursor-pointer"
              onClick={approveComment}
            />
          )}

          <img
            src={assets.bin_icon}
            alt="delete"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
            onClick={deleteComment}
          />
        </div>
      </td>
    </tr>
  )
}

export default CommentTableItem
