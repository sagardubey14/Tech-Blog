import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {setUserPosts} from '../../features/posts/combinedPostSlice'
import Post from '../PostCard/Post'


function UserPosts() {
  const dispatch = useDispatch()
  const userposts = useSelector(state=>state.combined.userposts)
  console.log(userposts);
  useEffect( ()=>{
    const getPost = async ()=>{
      if(userposts.length === 0){
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/post/get`,{
          withCredentials:true
        })
        console.log(res);
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
      {
        userposts.length === 0?
        <h1 className="mb-4 text-3xl text-center font-extrabold leading-none tracking-tight text-darkBlue md:text-3xl lg:text-3xl">
        Create Your Post
        </h1>:
        <div className="flex flex-wrap -mx-px md:-mx-3">
            {userposts.map(
              post=><Post
              key={post._id}
              OnePost={post}
              name='user'
            />
            )}
          </div>
      }
    </div>
    </>
  )
}

export default UserPosts
