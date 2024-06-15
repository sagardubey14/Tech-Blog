import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {getPosts} from '../../features/posts/userPostSlice'
import { Editor } from '@monaco-editor/react'
import Post from '../Post'


function UserPosts() {
  const dispatch = useDispatch()
  const userposts = useSelector(state=>state.userposts.userposts)
  useEffect( ()=>{
    const getPost = async ()=>{
      try {
        const res = await axios.get('http://localhost:3001/post/get',{
          withCredentials:true
        })
        dispatch(getPosts(res.data))

      } catch (error) {
        console.log(error);
      }
    }
    getPost();
  },[])
  return (
    <>
    {console.log(userposts)}
    <div className="px-px md:px-3  bg-slate-500">
          <div className="flex flex-wrap -mx-px md:-mx-3">
            {userposts.map(
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

export default UserPosts
