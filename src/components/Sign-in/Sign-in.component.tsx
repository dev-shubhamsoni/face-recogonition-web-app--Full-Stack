import React, { useState } from 'react';

interface SignInFormProps {
  onSignIn: (username: string, password: string) => void;
  register: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSignIn, register }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(username, password);
  };

  return (
    <div className="flex items-center justify-center h-screen mt-[-5rem]">
      <form className="bg-white p-8 shadow-md rounded-md" onSubmit={handleSignIn}>
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Sign In
        </button>
      <p onClick={register} className=' cursor-pointer'> Register</p>
      </form>
    </div>
  );
};
