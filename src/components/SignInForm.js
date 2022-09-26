import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import  './signInForm.css'
import { postLogin } from '../reduxStore/authenticationSlice';

function SignInForm(){

    const rememberMeRef = useRef();
    const [ usernameValue, setUsernameValue ] = useState('');
    const [ passwordValue, setPasswordValue ] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector((state) => state.auth)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = {
            email: usernameValue,
            password: passwordValue
        }

        // will send login data to server
        dispatch(postLogin(loginData))
    }

    // will execute code when auth value changes
    useEffect(() => {
        if(auth && auth.token) {
            if(rememberMeRef.current.checked) {
                // after successful authentication place token to localStorage if remember me is ticked
                localStorage.setItem('token', auth.token);
            }
            // if token exist will navigate to profile page
            navigate('/profile')
        }
    }, [auth, navigate])


    return (
    <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        {auth.error ? <p className='sign-in-error'>{auth.error}</p> : ""}
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    value={usernameValue}
                    onChange={(e)  => setUsernameValue(e.target.value)}
                    />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    value={passwordValue}
                    onChange={(e)  => setPasswordValue(e.target.value)}
                    />
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" ref={rememberMeRef} />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
        </form>
    </section>
)
}

export default SignInForm

