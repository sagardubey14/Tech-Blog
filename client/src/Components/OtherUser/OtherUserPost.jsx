import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {setOtherPosts} from '../../features/posts/combinedPostSlice'
import Post from '../PostCard/Post'
import postsLoading from "../../assets/soln-loading.gif";


function OtherUserPost({username}) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const otherPosts = useSelector(state=>state.combined.otheruserposts)
  useEffect( ()=>{
    const getPost = async ()=>{
      setLoading(true)
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/post/getother`,{
            params: { username: username }
        })
        dispatch(setOtherPosts(res.data))
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getPost();
  },[])
  return (
    <>
    <div className="px-px md:px-3 bg-softWhite">
    {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <img src={postsLoading} className="bg-softWhite" />
          </div>
        ) : (
          <>
            {otherPosts.length === 0 ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <p
                  className="text-3xl font-extrabold leading-none tracking-tight text-black md:text-3xl lg:text-3xl cursor-pointer"
                >
                  The User hasn't Posted yet
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap -mx-px md:-mx-3">
                {otherPosts.map(
              post=><Post
              key={post._id}
              OnePost={post}
              name='other'
            />
            )}
              </div>
            )}
          </>
        )}
    </div>
    </>
  )
}

export default OtherUserPost
