import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuthContext();
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>Urban Dwell</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login" style={{ zIndex: 10000 }}>
              (Guest) Sign in
            </Link>
            <Link to="/register" className="register">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Agents</Link>
          <Link to="/">Sign in</Link>
          <Link to="/">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
