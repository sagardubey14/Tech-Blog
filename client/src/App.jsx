import { Route, Routes } from 'react-router-dom'
import Home from "./Components/Home"
import Signin from "./Components/Signin"
import Signup from "./Components/Signup"
import Header from './Components/homeComponents/Header'
import SearchPage from './Components/SearchPage'
import Footer from './Components/homeComponents/Footer';


function App() {

  return (
    <>
    <Header />
      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Signin />}/>
        <Route path='/search' element={<SearchPage />}/>
        <Route path='/' element={<Home />}/>
      </Routes>
    <Footer />
    
    </>
  )
}

export default App
