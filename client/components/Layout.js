import React from 'react';
import { Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <div>
        <Link to={'/login'}>Sign In</Link>
      </div>
      <div>
        <Link to={'/signup'}>Sign Upp</Link>
      </div>
    </div>
  );
};

export default Layout;
