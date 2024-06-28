import { useState } from 'react';
import jspic from '../assets/SX.png'
import { validatePassword } from '../utils/validation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';
import {setMsg} from '../features/notifications/noteSlice'
import { Link, useNavigate } from 'react-router-dom';

export default function Signin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username:'sagar_353',
    email: '',
    password: 'Sagar123',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const validateForm = () => {
    const {password} = formData;
    let isValid = true;

    if (!validatePassword(password)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 8 characters long',
      }));
      isValid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: '',
      }));
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateForm()){
      try {
        const response = await axios.post('http://localhost:3001/auth/signin' , formData,{
          withCredentials:true
        } )
        dispatch(setUser(response.data))
        dispatch(setMsg({
          msg:`Welcome Back ${response.data.username}`,
          time:5,
          showMsg:true,
          type:1,
        }))
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  }

	return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <img src={jspic} className=' size-20 '/>
          <h3 className="text-xl ml-3 font-bold text-blue-900">Login</h3>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Username
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
            <div className="flex items-center justify-end mt-4">
              <Link
                className="text-sm text-gray-600 underline hover:text-gray-900"
                to="/signup"
              >
                Not registered?
              </Link>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
