import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
 

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white border-b border-gray-900 '>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl  font-bold text-[#FF0000]'>Career<span className='text-[#000000]'>Bridge</span></h1>
                </div>
                <div className='flex items-center gap-12 '>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='text-[#000000]'><Link to="/">Home</Link></li>
                                    <li className='text-[#000000]'><Link to="/jobs">Jobs</Link></li>
                                    <li className='text-[#000000]'><Link to="/browse">Browse</Link></li>
                                    <li className='text-[#000000]'><Link to="/profile">Profile</Link></li>
                                    <li className='text-[#000000]'><Link to="/">LogOut</Link></li>
                                    
                                   
                                </>
                            )
                        }


                    </ul>

                </div>
            </div>

        </div>
    )
}

export default Navbar