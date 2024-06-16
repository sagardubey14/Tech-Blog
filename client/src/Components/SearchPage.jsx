import { useSelector } from "react-redux"
import Post from "./Post"
import SearchedPost from "./SearchedPosts"
import { Route, Routes } from "react-router-dom"

function SearchPage() {
  const searchdePosts = useSelector(state=>state.posts.posts)
  return (
      <div className="px-px md:px-3 min-h-screen  bg-slate-500">
        <p className=" text-xl">The solutions for your problems are:</p>
          <div className="flex flex-wrap -mx-px md:-mx-3">
          {searchdePosts.map(
            post=><SearchedPost key={post._id} 
              postId={post._id}
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
