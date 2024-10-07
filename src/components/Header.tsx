import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Lightbulb className="mr-2" />
          <span className="text-xl font-bold">Startup Idea Community</span>
        </Link>
        <nav>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;