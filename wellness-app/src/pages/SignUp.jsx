import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      setLoading(true);
      const res = await fetch('/api/auth/signup',  {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return
      }
      setLoading(false)
      setError(null)
      navigate('/signin');
    } catch (error) {
      setLoading(false)
    }
    // console.log(data);

  }
  // console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder="username" id="username" className='border p-3 rounded-lg' onChange={handleChange}/>
        <input type="email" placeholder="email" id="email" className='border p-3 rounded-lg' onChange={handleChange}/>
        <input type="password" placeholder="password" id="password" className='border p-3 rounded-lg' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80'>
        {loading ? 'Loading' : 'Sign Up'}

        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/signin'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
