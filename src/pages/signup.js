import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PORT = "https://socket-chat-backend-6jct.onrender.com"
const Signup = () => {
  const navigate = useNavigate();

  const payload = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(payload);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log("PORT+", PORT);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = JSON.stringify(formData);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${PORT}/users/signup`,

      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.success === true) {
          toast.success("User Created Successfully");
          setFormData(payload);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md flex flex-col items-center p-8 space-y-4 bg-white rounded shadow-lg'>
        <h2 className='text-2xl font-bold text-center'>Sign Up</h2>
        <form onSubmit={handleSubmit} className='space-y-4 w-full'>
          <div>
            <label className='block mb-1 text-gray-600' htmlFor='username'>
              Username
            </label>
            <input
              type='text'
              id='username'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
          </div>
          <div>
            <label className='block mb-1 text-gray-600' htmlFor='email'>
              Email
            </label>
            <input
              // type="email"
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
          </div>
          <div>
            <label className='block mb-1 text-gray-600' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full px-3 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600'
          >
            Sign Up
          </button>
        </form>
        <button onClick={() => navigate("/")} className='text-violet-500  '>
          have you an account ?
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
