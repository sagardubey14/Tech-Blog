import {Link, Route, Routes} from 'react-router-dom'
import Followers from './Followers'
import UserPosts from './ProfileCompo/UserPosts'
import Following from './Following'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import AddPost from './AddPost'
import ProfileHeader  from './ProfileCompo/PofileHeader'
import Post from './Post'

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
    <>
    <ProfileHeader />
    <button onClick={handleDisply} className='flex flex-col items-center justify-around'> <Link to='/profile/edit'>Edit it</Link> </button>
    <div className="relative min-h-screen">
    <div className={`${hello} absolute bg-white w-screen`}>
        <AddPost setHello={setHello}/>
    </div>
    <ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
        <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
          <a className="inline-block p-3" href="#">
            <i className="fas fa-th-large text-xl md:text-xs"></i>
            <Link to="/profile" className="hidden md:inline">Post</Link>
          </a>
        </li>   
        <li className='md:border-t md:border-gray-700'>
          <a className="inline-block p-3" href="#">
            <i className="far fa-square text-xl md:text-xs"></i>
            <Link to="/profile/saved" className="hidden md:inline">Saved</Link>
          </a>
        </li>
    </ul>
    
    <Routes>
        <Route  path='/' element={<UserPosts />} />
        <Route  path='/saved' element={<UserPosts />} />
        <Route path='/followers' element={<Followers />} />
        <Route path='/following' element={<Following />} />
    </Routes>
    </div>
    </>
  )
}

export default Profile
