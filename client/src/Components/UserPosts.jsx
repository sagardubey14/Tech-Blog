import { useSelector, useDispatch } from 'react-redux'
import { addPost } from '../features/posts/postSlice'
import { useState } from 'react'

function UserPosts() {
    const posts = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    
    const [formData, setFormData] = useState({
        username:'username',
        keywords:'keywords',
        title: 'title',
        description:'desc',
        code:'code',
      });
    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
    };
    const handleSubmit = ()=>{
        const keywordsArray = formData.keywords.split(", ").map(keyword => keyword.trim());
        dispatch({
            username:formData.username,
            keywords:keywordsArray,
            title: formData.title,
            description: formData.description,
            code: formData.code,
        })
    }

  return (
    <div>
      <h2>Create a New Post</h2>
        <form id="postForm">
        <label >UserclassName:</label>
        <input type="text" value={formData.username} onChange={handleChange} className="username"/>
        
        <label >Keywords:</label>
        <input type="text" value={formData.keywords} onChange={handleChange} className="keywords"/>
        
        <label >Title:</label>
        <input type="text" value={formData.title} onChange={handleChange} className="title"/>
        
        <label >Description:</label>
        <textarea value={formData.description} onChange={handleChange} className="description"></textarea>
        
        <label>Code:</label>
        <textarea value={formData.code} onChange={handleChange} className="code"></textarea>
        
        <button onClick={()=>handleSubmit}>submit</button>
        </form>
    </div>
  )
}

export default UserPosts
