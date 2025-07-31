import React from 'react'

export default function Profile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  return (
    <div className='p-3 max-w-sm mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
          type="text" 
          placeholder='username' 
          id='username' 
          defaultValue={currentUser.username} 
          className='border p-3 rounded-lg' onChange={handlechange}
        />
        <input 
          type="email" 
          placeholder='email' 
          id='email' 
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg' onChange={handlechange}
        />
        <input 
          type="password" 
          placeholder='password' 
          id='password' 
          className='border p-3 rounded-lg' onChange={handlechange}
        />
        <button 
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "Loading..." : "Update" }
        </button>
        </form>
        </div>
  )
}
