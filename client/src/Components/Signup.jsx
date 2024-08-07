import { useState } from 'react';
import jspic from '../assets/SX.png'
import { validateEmail, validatePassword } from '../utils/validation';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setMsg} from '../features/notifications/noteSlice'
import buttonLoading from "../assets/button-loading.gif";

export default function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [termsChecked,setTermsChecked] = useState(false)
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username:'',
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestion:"What is your pet's name?",
    securityAnswer:''
  });
  const [formErrors, setFormErrors] = useState({
    username:'',
    email: '',
    password: '',
    confirmPassword: '',
    terms:''
  });
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;
    let isValid = true;

    if (username === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        username: 'This field is required',
      }));
      isValid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        username: '',
      }));
    }

    if (!validateEmail(email)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email address',
      }));
      isValid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: '',
      }));
    }

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

    if (password !== confirmPassword) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match',
      }));
      isValid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: '',
      }));
    }
    if(!termsChecked){
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        terms: 'Please agree to the terms and conditions',
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateForm()){
      setLoading(true)
      try {
        console.log(formData);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup` , formData )
        console.log(response);
        setLoading(false)
        dispatch(setMsg({
          msg:`Registered Successfully`,
          time:3,
          showMsg:true,
          type:2,
        }))
        navigate('/login');
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    }
    
  }

	return (
    <div>
      <div className="flex flex-col items-center min-h-screen mx-2 mb-4 pt-6 md:pt-0 md:mt-0 sm:justify-center sm:pt-4 bg-gray-100">
      <div className='flex flex-col items-center mb-6'>
          <img src={jspic} className=' size-20 '/>
          <h3 className="text-xl font-bold text-darkBlue md:text-3xl lg:text-3xl">Sign up</h3>
        </div>
        <div className="w-full px-6 py-4 overflow-hidden bg-slate-300 shadow-md sm:max-w-md sm:rounded-lg">
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
            {formErrors.username && <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>}
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
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {formErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>}
            <div className="mt-4">
              <label
                htmlFor="security_Question"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Security Question
              </label>
              <div className="flex flex-col items-start">
                <select 
                  name="securityQuestion"
                  value={formData.securityQuestion}
                  onChange={handleChange}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="security_question">
                  <option value="What is your pet's name?">What is your pet's name?</option>
                  <option value="What is your date of birth?">What is your date of birth?</option>
                  <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                  <option value="What is the name of your first school?">What is the name of your first school?</option>
                  <option value="What is your favorite movie?">What is your favorite movie?</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="security_Answer"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Security Answer
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="securityAnswer"
                  value={formData.securityAnswer}
                  onChange={handleChange}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex items-start mt-4 ml-1">
                <div className="flex items-center h-5">
                  <input onClick={ (e) => setTermsChecked(e.target.checked)} id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                </div>
                <div className="ml-3 text-sm">
                  <label className="text-sm font-medium leading-6 text-gray-700">Terms and conditions</label>
                </div>          
            </div>
            {!termsChecked && <p className="text-red-500 text-sm mt-1">{formErrors.terms}</p>}
            <div className="flex items-center justify-end mt-4">
              <Link
                className="text-sm text-gray-600 underline hover:text-gray-900"
                to="/login"
              >
                Already registered?
              </Link>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                onClick={handleSubmit}
              >
                {loading?<img className='h-4 px-5' src={buttonLoading} />:'Register'}
              </button>
            </div>            
          </form>
        </div>
      </div>
    </div>
  );
} 
