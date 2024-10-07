import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lightbulb, LogIn, LogOut, UserPlus } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Lightbulb className="mr-2" />
          Startup Idea Community
        </Link>
        <div>
          {user ? (
            <button
              onClick={logout}
              className="flex items-center bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
            >
              <LogOut className="mr-2" />
              Logout
            </button>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="flex items-center bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
              >
                <LogIn className="mr-2" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                <UserPlus className="mr-2" />
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;