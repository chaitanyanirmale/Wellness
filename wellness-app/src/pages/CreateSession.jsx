import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function CreateSession() {
    const {currentUser} = useSelector(state => state.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        tags: [],
        content: '',
        status: '', 
    });
    
const handleChange = (e) => {

  if (e.target.id === 'tags') {
    setFormData({
      ...formData,
      tags: e.target.value.split(','),
    });
  } 
  if(e.target.type === 'number' || e.target.type === 'text' ||  e.target.type === 'textarea'){
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }
    if(e.target.id === 'status'){
      setFormData({
        ...formData, 
        status: e.target.value
      })
    }
};
// console.log(formData)
const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {

        const res = await fetch('/api/session/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            })
            const data = await res.json();
            setLoading(false);
            if(data.success === false){
                setError(data.message);
            }
           navigate(`/my-sessions/${data._id}`);
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
  };
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl text-center font-semibold mb-4">Create New Wellness Session</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          
          <input
            placeholder='Title'
            type="text"
            id='title'
            className="w-full border rounded p-2"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            placeholder='Tags'
            type="text"
            id='tags'
            className="w-full border rounded p-2"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        <div>
          <textarea
            placeholder='Content'
            type='textarea'
            id='content'
            className="w-full border rounded p-2 h-40"
            value={formData.content}
            onChange={handleChange}
          />
        </div>

        <div>
          <select
            className="w-full border rounded p-2"
            id='status'
            value={formData.status}
            onChange={handleChange}
          >
            <option value="draft" >Draft</option>
            <option value="published" >Published</option>
          </select>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Session'}
        </button>
      </form>
    </div>
  )
}
