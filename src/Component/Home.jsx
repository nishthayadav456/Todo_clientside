import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
const Home = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div>
      <div>
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <NavLink to="/">
              <div className="text-white text-lg font-bold">
                Todo Application
              </div>
            </NavLink>
            
            <div>
              {isLoggedIn ? (
                <>
                  <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Login
                    </button>
                  </NavLink>
                  <NavLink to="/signup">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Signup
                    </button>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div>
            <h1 className="text-4xl font-bold">Welcome to My Todo Website</h1>
            <NavLink to="/todo">
              <button className="bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4 ml-40">
                TODO
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Home
