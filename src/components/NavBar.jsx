import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2>My News</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/topics">Topics</Link></li>
          <li><Link to="/users/grumpy19">User Profile</Link></li> 
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;