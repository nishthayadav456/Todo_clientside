import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import Joi from 'joi-browser';
import { useAuth } from './AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).max(30).required().label("Password")
  };

  const validate = () => {
    const { error } = Joi.validate(data, schema, { abortEarly: false });
    if (!error) return null;

    const errors = {};
    for (let item of error.details)
      errors[item.path[0]] = item.message;
    return errors;
  };

  function handleChange(e) {
    setData({ ...data, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    setLoading(true);
    try {
      const response = await axios.post('https://todo-backend-vt7b.onrender.com/api/login', data, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log(response);
      alert(response.data.message);
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log(err);
      alert(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center underline">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input type="email" id="email" className="border rounded w-full py-2 px-3 text-gray-700" placeholder="Enter your email" onChange={handleChange} value={data.email} />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="text-gray-700 text-sm font-bold mb-2">Password:</label>
            <input type="password" id="password" className="border rounded w-full py-2 px-3 text-gray-700 mb-3" placeholder="Enter your password" onChange={handleChange} value={data.password} />
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>
          <div className="flex items-center justify-center ">
            <div>
              <button type="submit" className="bg-purple-500 text-white font-bold py-2 px-4 rounded" style={{ width: "20rem" }} disabled={loading}>
                {loading ? 'Logging in...' : 'LogIn'}
              </button>
              <p>Don't have an account?</p>
              <NavLink to='/signup'>
                <button type="button" className="border text-black font-bold py-2 px-4 rounded mt-4" style={{ width: "20rem" }}>
                  Create Account
                </button>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
