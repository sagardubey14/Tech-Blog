import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setTrend } from '../../features/posts/postSlice'

import axios from 'axios';
import Post from '../PostCard/Post';

const FeaturedSolutions = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state=>state.posts.trend)
  
  useEffect(()=>{
    const call = async ()=>{
      const res = await axios.get('http://localhost:3001/post/trend')
      dispatch(setTrend(res.data))
    }
    call();
  },[])


  return (
    <section className="">
      <h2 className="text-2xl font-bold mb-4">Featured Solutions</h2>
      <div className='flex flex-row'>
        {posts.map(
          post=><Post 
          key={post._id} 
          title={post.title}
          code={post.code}
          keywords={post.keywords}
          />
        )}
      </div>
    </section>
  );
};

export default FeaturedSolutions;
