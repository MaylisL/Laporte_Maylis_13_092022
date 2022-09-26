import './navBar.css';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/argentBankLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../reduxStore/userSlice';
import { clearToken } from '../reduxStore/authenticationSlice';


function NavBar() {
  
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // when logout will clear user and token  from store and redirect to homepage
  const logOut = () => {
    dispatch(clearUser());
    dispatch(clearToken());
    navigate('/');
  }

  if (user?.firstName) {
    return (
      <nav className="main-nav">

        <Link to={'/'} className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link to={'/profile'} className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            {user.firstName}
          </Link>
          <button onClick={logOut} className="main-nav-item">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </button>
        </div>
      </nav>
    )
  }
  else {
    return (
      <nav className="main-nav">
        <Link to={'/'} className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link to={'/login'} className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>
    )
  }
}

export default NavBar;