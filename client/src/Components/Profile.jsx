import {Link, Route, Routes} from 'react-router-dom'
import Followers from './Followers'
import UserPosts from './UserPosts'
import Following from './Following'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import AddPost from './AddPost'

function Profile() {
    const user = useSelector(state=>state.user.user)
    const [hello,setHello] = useState('hidden')
    const handleDisply = ()=>{
        if(hello == 'block'){
            setHello('hidden')
        }else{
            setHello('block')
        }
    }

  return (
    <div className="relative min-h-screen">
    <div className='flex items-center justify-aroundlex flex-row'>
            <img className='object-cover object-center h-32' src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Woman looking front' />
            <p className='flex flex-col items-center justify-between'>sagar</p> 
            <button onClick={handleDisply} className='flex flex-col items-center justify-around'> <Link to='/profile/edit'>Edit it</Link> </button>
    </div>
    <div className={`${hello} absolute bg-white w-screen`}>
        <AddPost setHello={setHello}/>
    </div>
    <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
        <li className="flex flex-col items-center justify-around">
            <div>2k</div>
            <div>No of posts</div> 
        </li>
        <li className="flex flex-col items-center justify-between">
            <div>{user.followers.length}</div>
            <Link to='/profile/followers'>followers</Link>
        </li>
        <li className="flex flex-col items-center justify-around">
            <div>{user.followers.length}</div>
            <Link to='/profile/following'>following</Link>
        </li>
    </ul>
    <Routes>
        <Route  path='/' element={<UserPosts />} />
        <Route path='/followers' element={<Followers />} />
        <Route path='/following' element={<Following />} />
    </Routes>
    </div>
  )
}

export default Profile
