import { useSelector } from 'react-redux'

function PofileHeader() {
  const user = useSelector(state=>state.user.user)
  return (
    <div className=' align-middle justify-items-center justify-center'>
      <header className="flex flex-wrap items-center p-4 md:py-8">
      <div className="md:w-3/12 md:ml-16">
        {/* profile image */}
        <img
          className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1"
          src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
          alt="profile"
        />
      </div>

      {/* profile meta */}
      <div className="w-8/12 md:w-7/12 ml-4">
        <div className="md:flex md:flex-wrap md:items-center mb-4">
          <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
            {user.username}
          </h2>

          {/* badge */}
          <span className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2" aria-hidden="true">
            <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
          </span>

          {/* follow button */}
          <a href="#" className="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded block text-center sm:inline-block block">
            Follow
          </a>
        </div>

        {/* post, following, followers list for medium screens */}
        <ul className="hidden md:flex space-x-8 mb-4">
          <li>
            <span className="font-semibold">0</span> posts
          </li>

          <li>
            <span className="font-semibold">{user.followers.length}</span> followers
          </li>
          <li>
            <span className="font-semibold">{user.following.length}</span> following
          </li>
        </ul>

        {/* user meta form medium screens */}
        <div className="hidden md:block">
          <h1 className="font-semibold">Mr Travlerrr...</h1>
          <span>Travel, Nature and Music</span>
          <p>Lorem ipsum dolor sit amet consectetur</p>
        </div>
      </div>

      {/* user meta form small screens */}
      <div className="md:hidden text-sm my-2">
        <h1 className="font-semibold">Mr Travlerrr...</h1>
        <span>Travel, Nature and Music</span>
        <p>Lorem ipsum dolor sit amet consectetur</p>
      </div>
    </header>
    </div>
  )
}

export default PofileHeader
