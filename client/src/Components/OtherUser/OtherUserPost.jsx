import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {setOtherPosts} from '../../features/posts/combinedPostSlice'
import Post from '../PostCard/Post'


function OtherUserPost({username}) {
  const dispatch = useDispatch()
  const otherPosts = useSelector(state=>state.combined.otheruserposts)
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
    <div className="px-px md:px-3 bg-softWhite">
          <div className="flex flex-wrap -mx-px md:-mx-3">
            {otherPosts.map(
              post=><Post
              key={post._id}
              OnePost={post}
              name='other'
            />
            )}
          </div>
    </div>
    </>
  )
}

export default OtherUserPost
