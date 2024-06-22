import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {setOtherPosts} from '../../features/posts/postSlice'
import Post from '../PostCard/Post'


function OtherUserPost({username}) {
  const dispatch = useDispatch()
  const otherPosts = useSelector(state=>state.posts.posts)
  useEffect( ()=>{
    const getPost = async ()=>{
      try {
        const res = await axios.get('http://localhost:3001/post/getother',{
            params: { username: username }
        })
        dispatch(setOtherPosts(res.data))
      } catch (error) {
        console.log(error);
      }
    }
    getPost();
  },[])
  return (
    <>
    <div className="px-px md:px-3  bg-slate-500">
          <div className="flex flex-wrap -mx-px md:-mx-3">
            {otherPosts.map(
              post=><Post
              key={post._id}
              title={post.title}
              code={post.code}
              keywords={post.keywords}
            />
            )}
          </div>
    </div>
    </>
  )
}

export default OtherUserPost
