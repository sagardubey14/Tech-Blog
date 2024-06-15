import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

function AddPost({setHello}) {
  const user = useSelector(state=>state.user.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(user.username ===''){navigate('/login')}
  },[])

  const handleSubmit = async()=>{
    const keys = keywords.split(', ');
    const content = {
      keywords:keys,
      title:title,
      description:desc,
      code:code,
    }
    console.log(content);
    const res = await axios.post('http://localhost:3001/post/add',content,{
      withCredentials:true,
    })
    console.log(res);
    setHello('hidden')
    setKeywords("")
    setTitle("")
    setDesc("")
    setCode("")
  }

  const [keywords,setKeywords] = useState("")
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [code,setCode] = useState("")

  return (
    <div className='flex items-center justify-aroundlex flex-row'>
      <div>
      <h1>Create Post</h1>
        <label >Keywords (comma separated):</label><br />
        <input type="text" value={keywords} onChange={(e)=>setKeywords(e.target.value)} /><br />
        
        <label >Title:</label><br />
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} /><br />
        
        <label >Description:</label><br />
        <textarea value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea><br />
        
        <label >Code:</label><br />
        <textarea value={code} onChange={(e)=>setCode(e.target.value)}></textarea><br />
        
        <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
    </div>
  )
}

export default AddPost
