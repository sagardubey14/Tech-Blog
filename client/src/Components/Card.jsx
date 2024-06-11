import Editor from '@monaco-editor/react';
import personIcon from '../assets/icons8-person-48.png'
import { useSelector } from 'react-redux'
import { useState } from 'react';


function Card() {
  const posts = useSelector(state=>state.posts.posts)
  const user = useSelector(state=>state.user.user)
  console.log(user);
  const [codes, setCodes] = useState([
      `let ans= 5; \nalert(ans)`,
      `let x = 10;\nconsole.log(x);`
  ]);

  function handleExecution(code){
    console.log(code);
    try {
      (eval(code));
    } catch (error) {
      console.log("Error: " + error.message);
    }
  }

  const handleCodeChange = (index, newCode) => {
    const newCodes = [...codes];
    newCodes[index] = newCode;
    setCodes(newCodes);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {
        posts.map(post=>
      <div key={post._id} className="max-w-sm bg-blue-300 rounded overflow-hidden shadow-lg">
        <Editor
            className="mt-3"
            height="10vh"
            defaultLanguage="javascript"
            defaultValue={post.code}
            theme='vs-dark'
            onChange={(newValue) => handleCodeChange(post._id, newValue)}
        />
        <div className="px-6 py-4">
        <button onClick={()=>handleExecution(post.code)} className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Execute</button>
          <div className="font-bold text-xl mb-2">Ttile-1</div>
          <p className="text-gray-700 text-base">
            {post.description}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#keywords1</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#keywords2</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#keywords3</span>
        </div>
        <div className="flex items-center px-6 pt-2 pb-2">
          <img src={personIcon} className="w-8 h-8 rounded-full mr-3" alt="Channel Icon"/>
          <div>
            <span className="text-gray-700 font-medium">{post.usernameCreatedBy}</span>
            {/* <p className="text-gray-600 text-sm">Channel Name</p> */}
          </div>
        </div>
      </div>
      )
    }
    </div>
  )
}

export default Card
