import { useSelector } from "react-redux"
import Post from "./Post"

function SearchPage() {
  const searchdePosts = useSelector(state=>state.posts.posts)
  return (
      <div className="px-px md:px-3  bg-slate-500">
          <div className="flex flex-wrap -mx-px md:-mx-3">
          {searchdePosts.map(
            post=><Post key={post._id} 
              title={post.title}
              code={post.code}
              keywords={post.keywords}
              username={post.usernameCreatedBy}
            />
          )}
      </div>
    </div>
  )
}
export default SearchPage
