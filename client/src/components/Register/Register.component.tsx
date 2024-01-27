import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  entries: number;
  joined: Date; 
}

interface RegistrationFormProps {
  setShowSignIn: (page: string) => void;
  loadUser: (page: User) => void;
  setIdForLoggedInUser: (page: number) => void;
  setInputImage: (page: string) => void;
  setAreaVisible: (page: boolean) => void;
  setShowSignInArea: (page: boolean) => void;
}

interface FormData {
  username: string;
  email: string;
  password: string;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({setShowSignInArea, setAreaVisible, setInputImage, setShowSignIn, loadUser, setIdForLoggedInUser}) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    fetch('http://localhost:4005/register', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        name: formData.username,
      })

    }).then(response => response.json())
    .then(user => {
      if (user.id) {
        setIdForLoggedInUser(user.id);
        loadUser(user);
        setShowSignIn("home");
        setInputImage('');
        setAreaVisible(false);
        setShowSignInArea(true);
      }
    })

    
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};


