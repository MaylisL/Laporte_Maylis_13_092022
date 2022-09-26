import './App.css';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SignIn from './pages/SignIn.js';
import {
  Routes,
  Route,
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setToken } from './reduxStore/authenticationSlice';


function App() {

  const storedToken = localStorage.getItem('token');
  const dispatch = useDispatch()
  

  useEffect(() =>  {
    if(storedToken) {
      dispatch(setToken(storedToken))
    }
  }, [dispatch, storedToken])

  
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="profile" element={<ProfilePage/>} />
      <Route path="login" element={<SignIn/>} />
    </Routes>
  );
}

export default App;
