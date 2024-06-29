import { useSelector } from "react-redux"
import Post from "../PostCard/Post"
import SearchedPost from "./SearchedPosts"
import { Route, Routes } from "react-router-dom"

function SearchPage() {
  const searchdePosts = useSelector(state=>state.posts.posts)
  return (
    <div className="px-4 md:px-6 min-h-screen bg-darkBlue text-white">
      <p className="text-xl text-coral mb-6">The solutions for your problems are:</p>
          <div className="flex flex-wrap -mx-px md:-mx-3">
          {searchdePosts.map(
            post=><SearchedPost key={post._id} 
              postId={post._id}
              title={post.title}
              code={post.code}
              keywords={post.keywords}
              username={post.usernameCreatedBy}
              likes={post.likes}
            />
          )}
      </div>
    </div>
  )
}
export default SearchPage
