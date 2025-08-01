import { useEffect, useState } from 'react';

export default function Home() {
    const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch('/api/sessions');
        const data = await res.json();
          setSessions(res.data);
          setLoading(false);
        if(data.success === false){
            setError(data.message);
        }
      } catch (err) {
        console.error('Failed to fetch sessions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);



  return (
     <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Published Wellness Sessions</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : sessions.length === 0 ? (
        <p className="text-center text-gray-600">No sessions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sessions.map((session) => (
            <div key={session._id} className="bg-white rounded-xl shadow p-5">
              <h2 className="text-xl font-semibold mb-2">{session.title}</h2>
              <p className="text-sm text-gray-500 mb-1">Type: {session.type}</p>
              <p className="text-sm text-gray-500 mb-1">Duration: {session.duration}</p>
              <p className="text-gray-700">{session.description}</p>
              <p className="mt-2 text-sm text-right text-gray-400">— {session.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
