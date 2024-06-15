import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {getPosts} from '../features/posts/userPostSlice'
import { Editor } from '@monaco-editor/react'


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
    <div className='flex justify-between'>
      <div>{
      userposts.map(post=>
        <div key={post._id} className='flex flex-col items-center justify-around'>
          <labe>Title: </labe><div>{post.title}</div>
          <label>Description: </label><div>{post.description}</div>
          <Editor
            className="my-3"
            height="15vh"
            width="100vh"
            defaultLanguage="javascript"
            defaultValue={post.code}
            theme='vs-dark'
        />
          <label>Likes: </label>{post.likes}
          <label>Comments: </label>{post.comments}
        <p>--------------------------------------------------------</p>
        </div>
      )

        }</div>
      <div>othersposts</div>
    </div>
  )
}

export default UserPosts
