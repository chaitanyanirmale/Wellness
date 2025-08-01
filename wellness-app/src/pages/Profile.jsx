import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUserFailure, updateUserStart, updateUserSuccess, deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure, signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure, } from '../redux/user/userSlice.js';

export default function Profile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

   const handlechange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
        const data = await res.json();
        if(data.success === false){
          dispatch(updateUserFailure(data.message));
          return;
        }
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
    }catch (error) {
      dispatch(updateUserFailure(error.message));

    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(null)); 
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }
  const handleDeleteUser = async () => {
      try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if(data.success === false){
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data)); 
      }
      catch(error){
        dispatch(deleteUserFailure(error.message));
      }
    }


  return (
    <div className='p-3 max-w-sm mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
          type="text" 
          placeholder='username' 
          id='username' 
          defaultValue={currentUser.username} 
          className='border p-3 rounded-lg' 
          onChange={handlechange}
        />
        <input 
          type="email" 
          placeholder='email' 
          id='email' 
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          onChange={handlechange}
        />
        <input 
          type="password" 
          placeholder='password' 
          id='password' 
          className='border p-3 rounded-lg'
          onChange={handlechange}
        />
        <button 
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "Loading..." : "Update" }
        </button>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-session"
        }>Create Session
        </Link>
        <div className='flex justify-between mt-5'>
          <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
          <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
        </form>
        </div>
  )
}
