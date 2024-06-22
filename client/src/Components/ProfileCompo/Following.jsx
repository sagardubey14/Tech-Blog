import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Following({setShowFollowing}) {
    const { user } = useParams();
    const User = useSelector((state) => state.user.user);
    const otherUser = useSelector((state) => state.otheruser.otheruser);
  return (
    
<div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Following</h5>
        <button onClick={()=>setShowFollowing(false)} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            X
        </button>
   </div>
   {user
        ? otherUser.follwing.map((name, index) => (
            <div key={index} className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" alt="Neil image" />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {name}
                      </p>
                    </div>
                    <button className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      Unfollow
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          ))
        : User.following.map((name, index) => (
            <div key={index} className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" alt="Neil image" />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {name}
                      </p>
                    </div>
                    <button className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      Unfollow
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          ))}
</div>

  )
}

export default Following
