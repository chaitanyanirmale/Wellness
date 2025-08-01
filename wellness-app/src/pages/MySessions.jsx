import React from 'react'
import  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

  
export default function MySessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(()=>{
     const fetchSessions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/session/my-sessions`); 
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch sessions');
        setSessions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Sessions</h2>
        <Link
          to="/create-session"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create New
        </Link>
      </div>

      {loading ? (
        <p>Loading your sessions...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : sessions.length === 0 ? (
        <p>No sessions found. Start by creating one!</p>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="border rounded p-4 shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{session.title}</h3>
                <p className="text-sm text-gray-600">
                  Status: <span className="capitalize">{session.status}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Last updated: {new Date(session.updated_at).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/update-session/${session._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                {session.status === 'published' && (
                  <a
                    href={session.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                  View
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
