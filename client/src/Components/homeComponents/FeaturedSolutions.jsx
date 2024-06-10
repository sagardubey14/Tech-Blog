import { useEffect, useState } from 'react';
import Card from '../Card';
import axios from 'axios';

const solutions = [
  { title: 'Solution 1', description: 'Brief description of solution 1', author: 'User1' },
  { title: 'Solution 2', description: 'Brief description of solution 2', author: 'User2' },
  // Add more solutions as needed
];

const FeaturedSolutions = () => {
  const [posts,setPosts] = useState([])
  
  useEffect(()=>{
    const call = async ()=>{
      const res = await axios.get('http://localhost:3001/post/trend')
      console.log(res.data);
    }
    call();
  },[])

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-4">Featured Solutions</h2>
        <Card />
        {/* {solutions.map((solution, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold">{solution.title}</h3>
            <p>{solution.description}</p>
            <p className="text-sm text-gray-500">By {solution.author}</p>
          </div>
        ))} */}
    </section>
  );
};

export default FeaturedSolutions;
