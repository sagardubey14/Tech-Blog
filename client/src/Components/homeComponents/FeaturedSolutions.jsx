import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrendPosts } from "../../features/posts/combinedPostSlice";
import { setFailedQueries } from "../../features/query/querySlice";
import loading from '../../assets/soln-loading.gif'

import axios from "axios";
import Post from "../PostCard/Post";

const FeaturedSolutions = () => {
  const [showloading, setShowLoading] = useState(false)
  const dispatch = useDispatch();
  const trendPost = useSelector((state) => state.combined.trendposts);
  useEffect(() => {
    const call = async () => {
      if (trendPost.length === 0) {
        setShowLoading(true)
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/post/trend`);
          dispatch(setTrendPosts(res.data.posts));
          dispatch(setFailedQueries(res.data.queries));
          setShowLoading(false);
        } catch (error) {
          if(error.response.status === 404){
            console.log("No Trednin posts found");
          }
          else{
            console.log(error);
          }
          setShowLoading(false);
        }
      }
    };
    call();
  }, []);

  return (
    <section className="bg-softWhite md:p-10 p-4">
      <h2 className="text-2xl font-bold mb-4 text-darkBlue">
        Featured Solutions
      </h2>
      {showloading?
        <div className="flex justify-center items-center min-h-[50vh]">
          <img src={loading} className="bg-softWhite"/>
        </div>:
        <div className="flex flex-col md:flex-row flex-wrap">
        {trendPost.map((post) => (
          <Post
            className="bg-white p-4 m-2 rounded border border-lightGrey shadow-md"
            key={post._id}
            OnePost={post}
            name="trend"
          />
        ))}
      </div>}
    </section>
  );
};

export default FeaturedSolutions;
