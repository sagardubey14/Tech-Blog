import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { setTrend } from '../../features/posts/postSlice'
import Card from '../Card';
import axios from 'axios';

const FeaturedSolutions = () => {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    const call = async ()=>{
      const res = await axios.get('http://localhost:3001/post/trend')
      await dispatch(setTrend(res.data))
    }
    call();
  },[])


  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-4">Featured Solutions</h2>
        <Card />
    </section>
  );
};

export default FeaturedSolutions;
