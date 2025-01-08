'use client';

import React, { useState } from 'react';

interface UserLoginProps {
  onSubmit: (userInput: { username: string; password: string }) => Promise<void>;
}

const UserLogin: React.FC<UserLoginProps> = ({ onSubmit }) => {
  const [userInput, setUserInput] = useState({ username: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userInput);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
    data-aos="zoom-in"
    >
      <h1 className='text-blue-600 mb-6'>Enter Login Details</h1>
      <form
        className="w-[90%] sm:w-[60%] lg:w-[40%] bg-white p-8 rounded-lg shadow-2xl"
        onSubmit={handleSubmit}
      >
        <input
          className="h-10 w-full mb-3 rounded border border-blue-600 p-2"
          type="text"
          name="username"
          placeholder="Username"
          value={userInput.username}
          onChange={handleInputChange}
          required
        />
        <input
          className="h-10 w-full mb-3 rounded border border-blue-600 p-2"
          type="password"
          name="password"
          placeholder="Password"
          value={userInput.password}
          onChange={handleInputChange}
          required
        />
        <button
          className="bg-blue-600 text-blue-100 font-semibold h-12 w-full rounded mb-5 hover:bg-blue-100 hover:text-blue-600"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
