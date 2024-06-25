import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Footer from "./Components/homeComponents/Footer";
import Profile from "./Components/ProfileCompo/Profile";
import NotFound from "./Components/homeComponents/NotFound";
import OthersProfile from "./Components/OtherUser/OthersProfile";
import SearchPage from "./Components/Search/SearchPage";
import Post from "./Components/PostCard/Post";
import AddPost from "./Components/PostCard/AddPost";
import SelectedPost from "./Components/PostCard/SelectedPost";
import Navbar from './Components/homeComponents/Navbar'
import EditProfile from "./Components/ProfileCompo/EditProfile";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/profile/editprofile" element={<EditProfile />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/solution" element={<SearchPage />} />
        <Route path="/solution/:postId" element={<SelectedPost />} />
        <Route path="/profile/:user/*" element={<OthersProfile />}/>
        <Route path="/post" element={<Post />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
