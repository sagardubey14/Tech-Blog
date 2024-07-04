import React, { useState, useEffect } from "react";
import { setSelectedQuery } from "../../features/query/querySlice";
import './Rotate.css'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RotatingStrings = ({ strings, interval }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentStrings, setCurrentStrings] = useState(strings.slice(0, 3));

  useEffect(() => {
    const rotateStrings = () => {
      setCurrentStrings((prevStrings) => {
        const [first, ...rest] = prevStrings;
        const nextString =
          strings[
            (strings.indexOf(rest[rest.length - 1]) + 1) % strings.length
          ];
        return [...rest, nextString];
      });
    };

    const intervalId = setInterval(rotateStrings, interval);

    return () => clearInterval(intervalId);
  }, [strings, interval]);

  const handleQuery = (str)=>{
    dispatch(setSelectedQuery(str));
    navigate('/addpost');
  }

  return (
    <div className="bg-darkBlue text-white p-5 md:pt-14 text-center">
    <p className="text-2xl text-coral mb-6">Here are some trending questions which have not been answered yet.</p>
    <div className="relative">
      <div className="flex flex-wrap justify-center bg-slate-700 md:p-7 rounded-lg p-2 shadow-lg gap-4">
        {currentStrings.map((str, index) => (
          <div key={index} onClick={()=>handleQuery(str)} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2 text-center text-slate-200 bg-slate-800 rounded-lg hover:bg-slate-600 transition-all duration-300 cursor-pointer">
            {str.query}
          </div>
        ))}
      </div>
    </div>
  </div>
  

  );
};

export default RotatingStrings;