import React, { useState } from "react";

interface SignInFormProps {
  register: () => void;
  setShowSignIn: (page: string) => void;
  setIdForLoggedInUser: (page: number) => void;
  setInputImage: (page: string) => void;
  setShowSignInArea: (page: boolean) => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  register,
  setShowSignIn,
  setIdForLoggedInUser,
  setInputImage,
  setShowSignInArea,
}) => {
  const [username, setUsername] = useState("test5@gmail.com");
  const [password, setPassword] = useState("test5");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4005/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.id) {
        setIdForLoggedInUser(data.id);
        setShowSignIn("home");
        setInputImage("");
        setShowSignInArea(true);
      }
    } catch (error) {
      console.log("Error during sign in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[49.8rem] mt-[-5rem] pt-16">
      <form
        className="bg-white p-8 shadow-md rounded-md w-[20rem]"
        onSubmit={handleSignIn}
      >
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
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
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
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
        <div className=" flex justify-between">
          <button
            disabled={username && password ? false : true}
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Sign In
          </button>
          <p onClick={register} className=" cursor-pointer border-2 px-5 items-center py-1 rounded-lg border-[#4e80ee]">
            Register
          </p>
        </div>
      </form>
    </div>
  );
};
