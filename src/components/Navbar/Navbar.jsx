import "./Navbar.css";

import logo from "../../assets/logo-white.png";
import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav>
        <img src={logo} alt="logo" />
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/posts">Posts</NavLink>
          </li>
          <li>
            <NavLink to="/new-post">New Post</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
