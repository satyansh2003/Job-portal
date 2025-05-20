import React, { useEffect, useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import {firebase_auth} from "../Something"

import { FaGoogle } from "react-icons/fa6"


const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  function handleGoogleSignUp() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(firebase_auth, provider).then((result) => {
      const cred = GoogleAuthProvider.credentialFromResult(result);
      const token = cred.accessToken;
      const user = result.user;
      navigate("/home")
    }).catch((err) => {
      alert(err.message)
    })
  }


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='flex w-full max-w-6xl shadow-lg rounded-2xl overflow-hidden'>
        {/* Left side with Image, Title, and Back Button */}
        <div className='relative w-1/2 bg-gray-200 flex items-center justify-center'>
          {/* Back to Home Button */}
          <div className='absolute top-4 right-4'>
            <Button
              variant='ghost'
              onClick={() => navigate('/')}
              className='text-white bg-[#6B6B6B] bg-opacity-20 hover:bg-opacity-30 rounded-md px-4 py-2'
            >
              Back to Home Page
            </Button>
          </div>
          {/* Title */}
          <div className='absolute top-4 left-4'>
            <h2 className='text-2xl text-white font-bold'>
              Career<span className='text-[#6B6B6B]'>Bridge</span>
            </h2>
          </div>
          <div className='flex items-center justify-center h-full'>
            {/* Place for image */}
            <img
              src='src/assets/loginpage.jpg'
              alt='Decorative'
              className='rounded-2xl object-cover w-full h-full'
            />
          </div>
        </div>

        {/* Right side with Form */}
        <div className='w-1/2 p-10 bg-gray-200'>
          <form onSubmit={submitHandler} className='space-y-6'>
            <h1 className='text-[#6B6B6B] font-bold text-3xl mb-5'>Login</h1>

            <div className='space-y-4'>
              <div>
                <Label className='text-[#6B6B6B]'>Email</Label>
                <Input
                  type='email'
                  value={input.email}
                  name='email'
                  onChange={changeEventHandler}
                  placeholder='abc@gmail.com'
                  className='bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                />
              </div>

              <div>
                <Label className='text-[#6B6B6B]'>Password</Label>
                <Input
                  type='password'
                  value={input.password}
                  name='password'
                  onChange={changeEventHandler}
                  placeholder='••••••••'
                  className='bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                />
              </div>

              <div className='flex items-center gap-4'>
                <RadioGroup className='flex items-center gap-4'>
                  <div className='flex items-center space-x-2'>
                    <Input
                      type='radio'
                      name='role'
                      value='student'
                      checked={input.role === 'student'}
                      onChange={changeEventHandler}
                      className='cursor-pointer'
                    />
                    <Label htmlFor='r1' className='text-[#6B6B6B]'>
                      Student
                    </Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Input
                      type='radio'
                      name='role'
                      value='recruiter'
                      checked={input.role === 'recruiter'}
                      onChange={changeEventHandler}
                      className='cursor-pointer'
                    />
                    <Label htmlFor='r2' className='text-[#6B6B6B]'>
                      Recruiter
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {loading ? (
              <Button className='w-full bg-indigo-600 hover:bg-indigo-700 text-[#6B6B6B] flex justify-center items-center'>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
              </Button>
            ) : (
              <Button
                type='submit'
                className='w-full bg-[#FFFFFF]hover:bg-indigo-600 text-white'
              >
                Login
              </Button>
            )}

            <div className='text-sm text-[#6B6B6B]'>
              Don't have an account?{' '}
              <Link to='/signup' className='text-indigo-500 hover:underline'>
                Signup
              </Link>
            </div>
          </form>
          <button
            onClick={handleGoogleSignUp}
            className='w-full flex justify-center items-center p-2 rounded-md gap-[1rem] transition-all duration-200 bg-[#000000] hover:bg-indigo-600 text-white'
          >
            <FaGoogle />
            <span>SignIn with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
