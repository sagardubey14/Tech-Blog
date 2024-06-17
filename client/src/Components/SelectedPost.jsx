import React, { useEffect, useState } from 'react'
import not_liked from '../assets/not_liked.png'
import liked from '../assets/liked.png'
import not_marked from '../assets/not_marked.png'
import marked from '../assets/marked.png'
import cmnt from '../assets/cmnt.gif'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {updatePost} from '../features/posts/postSlice'
import { addToLikedPosts, removeFromLikedPosts } from '../features/user/userSlice'

function SelectedPost() {
  const [isLiked,setIsLiked] = useState(false);
  const [ismarked,setIsMarked] = useState(false);

  const { postId } = useParams();
  const searchdePosts = useSelector(state=>state.posts.posts);
  const user = useSelector(state=>state.user.user)
  const selectedPost = searchdePosts.find(post => post._id === postId.slice(1));
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(isLiked, "current value");
    if(isLiked){
      dispatch(updatePost({likes:1,id:selectedPost._id}))
      dispatch(addToLikedPosts(selectedPost._id))
    }else{
      dispatch(updatePost({likes:-1,id:selectedPost._id}))
      dispatch(removeFromLikedPosts(selectedPost._id))
    }
  }, [isLiked]);
  

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
        <p className='mb-2'><span className='font-bold'>Date:</span> {selectedPost.createdAt.slice(0,10)}</p>
        <p className='mb-2'><span className='font-bold'>Likes:</span> {selectedPost.likes}</p>
        <div className="flex items-center">
        <div className="flex items-center">
            <img 
            src={isLiked?liked:not_liked}
            onClick={()=>setIsLiked(prev=>!prev)}
            className=" w-8 h-8 rounded-full mr-1" 
            alt="Like Icon"/>
            <p className="mr-3">{selectedPost.likes}</p>
        </div>
        <div className="flex items-center ml-4">
            <img src={cmnt} className="w-8 h-8 mr-1" alt="Comment Icon"/>
            <p className="mr-3">{selectedPost.comments.length}</p>
        </div>
        <img 
        src={ismarked?marked:not_marked} 
        onClick={()=>{
          setIsMarked(prev=>!prev)
        }}
        className="w-8 h-8 rounded-full ml-auto" 
        alt="Not Marked Icon"/>
      </div>
    </div>
    </div>
  )
}

export default SelectedPost
