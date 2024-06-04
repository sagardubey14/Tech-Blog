import { Route, Routes } from 'react-router-dom'
import Home from "./Components/Home"
import Signin from "./Components/Signin"
import Signup from "./Components/Signup"
import Header from './Components/homeComponents/Header'

function App() {

  return (
    <>
    <Header />
      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Signin />}/>
        <Route path='/' element={<Home />}/>
      </Routes>
    </>
  )
}

export default App
