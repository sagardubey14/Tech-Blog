import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {getPosts} from '../../features/posts/userPostSlice'
import {setUserPosts} from '../../features/posts/combinedPostSlice'
import { Editor } from '@monaco-editor/react'
import Post from '../PostCard/Post'


function UserPosts() {
  const dispatch = useDispatch()
  const userposts = useSelector(state=>state.combined.userposts)
  useEffect( ()=>{
    const getPost = async ()=>{
      if(userposts.length === 0){
      try {
        const res = await axios.get('http://localhost:3001/post/get',{
          withCredentials:true
        })
        dispatch(getPosts(res.data))
        dispatch(setUserPosts(res.data))
      } catch (error) {
        console.log(error);
      }
    }
    }
    getPost();
  },[])
  return (
    <>
    <div className="px-px md:px-5 md:pb-5 bg-softWhite">
          <div className="flex flex-wrap -mx-px md:-mx-3">
            {userposts.map(
              post=><Post
              key={post._id}
              OnePost={post}
              name='user'
            />
            )}
          </div>
    </div>
    </>
  )
}

export default UserPosts
