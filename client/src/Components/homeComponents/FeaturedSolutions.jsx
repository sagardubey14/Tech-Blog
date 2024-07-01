import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setTrendPosts } from '../../features/posts/combinedPostSlice';

import axios from 'axios';
import Post from '../PostCard/Post';

const FeaturedSolutions = () => {
  const dispatch = useDispatch()
  const trendPost = useSelector(state=>state.combined.trendposts)
  useEffect(()=>{
    const call = async ()=>{
      if(trendPost.length===0){
        console.log("caling trend");
      const res = await axios.get('http://localhost:3001/post/trend')
      dispatch(setTrendPosts(res.data))
      }
    }
    call();
  },[])


  return (
    <section className="bg-softWhite md:p-10 p-4">
      <h2 className="text-2xl font-bold mb-4 text-darkBlue">Featured Solutions</h2>
      <div className='flex flex-col md:flex-row flex-wrap'>
        {trendPost.map(
          post=><Post className="bg-white p-4 m-2 rounded border border-lightGrey shadow-md"
          key={post._id} 
          OnePost={post}
          name='trend'
          />
        )}
      </div>
    </section>
  );
};

export default FeaturedSolutions;
