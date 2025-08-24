import React, { useState } from 'react';

interface SignUpProps {
  onSignUpSuccess: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSignUpSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && email) {
      // In a real app, you'd have validation and an API call here.
      onSignUpSuccess();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative z-10 p-4">
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleSubmit} 
          className="bg-gray-800/50 backdrop-blur-sm ring-1 ring-white/10 rounded-2xl shadow-2xl shadow-black/40 p-8 space-y-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 mb-2">
              Join The Future
            </h1>
            <p className="text-slate-400">Create your account to access ProMail.</p>
          </div>

          {/* Username Input */}
          <div className="relative">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-glow block w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-slate-200 placeholder-transparent focus:outline-none peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="username"
              className="absolute text-slate-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4
                         peer-focus:text-cyan-400
                         peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                         peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Username
            </label>
          </div>
          
          {/* Email Input */}
           <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-glow block w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-slate-200 placeholder-transparent focus:outline-none peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute text-slate-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4
                         peer-focus:text-cyan-400
                         peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                         peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Email Address
            </label>
          </div>

          <button
            type="submit"
            disabled={!username || !email}
            className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-cyan-500/20 hover:from-pink-500 hover:to-violet-600 hover:shadow-pink-500/20 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};