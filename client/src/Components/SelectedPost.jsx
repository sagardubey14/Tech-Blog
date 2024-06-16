import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function SelectedPost() {
  // const [id,setId] = useState('')
  const { postId } = useParams();
  const searchdePosts = useSelector(state=>state.posts.posts)
  const selectedPost = searchdePosts.find(post => post._id === postId.slice(1))
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
    <div className='bg-white shadow-md rounded-lg p-8 max-w-3xl w-full'>
        <h2 className='text-2xl font-bold mb-4'>Here is the selected post</h2>
        <p className='mb-2'><span className='font-bold'>Id:</span> {selectedPost._id}</p>
        <p className='mb-2'><span className='font-bold'>Title:</span> {selectedPost.title}</p>
        <div className='mb-2'>
            <span className='font-bold'>Keywords:</span>
            {selectedPost.keywords.map((word, index) => (
                <p key={index} className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>{word}</p>
            ))}
        </div>
        <p className='mb-2'><span className='font-bold'>Description:</span> {selectedPost.description}</p>
        <pre className='bg-gray-100 p-4 rounded-lg overflow-auto mb-2'><code className='text-sm'>{selectedPost.code}</code></pre>
        <p className='mb-2'><span className='font-bold'>Likes:</span> {selectedPost.likes}</p>
        <p className='mb-2'><span className='font-bold'>Date:</span> {selectedPost.createdAt.slice(0,10)}</p>
        <br />
    </div>
    </div>
  )
}

export default SelectedPost
