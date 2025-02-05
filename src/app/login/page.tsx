'use client';

import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent, userType: string) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Username and password are required.');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call (replace with your actual API logic)
      const response = await new Promise<{ success: boolean; message?: string }>((resolve) => {
        setTimeout(() => {
          if (userType === 'admin' && username === 'admin' && password === 'admin') {
            resolve({ success: true, message: 'Admin login successful' });
          } else if (userType === 'user' && username === 'user' && password === 'user') {
            resolve({ success: true, message: 'User login successful' });
          } else {
            resolve({ success: false, message: 'Invalid username or password' });
          }
        }, 1000);
      });

      if (response.success) {
        console.log(response.message);
        // Handle successful login (e.g., set authentication state, redirect)
      } else {
        setError(response.message || 'Login failed.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-red-200">
      <div className="bg-gray-300 backdrop-blur-md p-8 rounded-lg shadow-md w-96 relative overflow-hidden bg-opacity-50"> {/* Glassy and translucent */}
        <div className="absolute inset-0 -z-50 bg-gradient-to-r from-white/30 via-transparent to-white/30 rounded-lg blur-[1px]"></div>
        <div className="relative z-10">
          <h2 className="text-2xl text-green-500 font-bold mb-4 text-center drop-shadow-lg">Placement Portal</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={(e) => handleSubmit(e, 'user')}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600 font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="text-yellow-600 border border-gray-300 rounded-full w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-600 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="text-red-800 border border-gray-300 rounded-full w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400 ${isLoading && 'opacity-75 cursor-not-allowed'}`}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'User Log In'}
              </button>
              <button
                type="button"
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300 disabled:bg-gray-400 ${isLoading && 'opacity-75 cursor-not-allowed'}`}
                onClick={(e) => handleSubmit(e, 'admin')}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Admin Log In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}