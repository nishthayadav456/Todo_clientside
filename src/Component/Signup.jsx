import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Joi from 'joi-browser';

const Signup = () => {
  const navigate = useNavigate();
  const [data,setData]=useState({
    username:"",
    email:"",
    password:""
  })
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().min(4).max(30).required().label("Username"),
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
  function handleChange(e){
setData({...data,[e.target.id]:e.target.value})
  }

  async function handleSubmit(e){
e.preventDefault()
const errors = validate();
setErrors(errors || {});
if (errors) return;
try {
  const response = await axios.post('https://todo-backend-vt7b.onrender.com/api/signup', data, {
    headers: {
      'Content-Type': 'application/json'
    },
    
  });
  alert(response.data.message);
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('token',response.data.username)
  setTimeout(() => {
    navigate("/login");
  }, 2000);
}
catch(err){
  console.log(err)  
  alert(err.message || "Something went wrong.",);    
  }
  }
  return (
    <div class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
    <h2 class="text-2xl font-bold mb-6 text-center underline">SignIn</h2>
    <form onSubmit={handleSubmit}>
    <div class="mb-4">
        <label for="username" class=" text-gray-700 text-sm font-bold mb-2">Username:</label>
        <input type="text" id="username" class="border rounded w-full py-2 px-3 text-gray-700 " placeholder="Enter your username" onChange={handleChange}value={data.username} />
        {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}
      </div>
      <div class="mb-4">
        <label for="email" class=" text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input type="email" id="email" class=" border rounded w-full py-2 px-3 text-gray-700" placeholder="Enter your email" onChange={handleChange} value={data.email}/>
        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
      </div>
      <div class="mb-6">
        <label for="password" class=" text-gray-700 text-sm font-bold mb-2">Password:</label>
        <input type="password" id="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" placeholder="Enter your password" onChange={handleChange} value={data.password}/>
        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
      </div>
      <div class="flex items-center justify-between">
        <div>
        <button type="submit" class="bg-purple-500 text-white font-bold py-2 px-4 rounded" style={{width:"20rem"}}>
          Sign In
        </button>
        <p>Already have an account</p>
       <NavLink to='/login'>
        <button type="submit" class="bg-purple-500 text-white font-bold py-2 px-4 rounded mt-4" style={{width:"20rem"}}>
        Go to Login 
        </button>
        </NavLink>
       
        </div>
       
      </div>
    </form>
  </div>
    </div>
  )
}

export default Signup
