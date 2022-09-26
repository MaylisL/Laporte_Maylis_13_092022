import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components  and  functions
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SignInForm from "../components/SignInForm";
// styles
import  './signIn.css';

function  SignIn() {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    useEffect(() =>  {
        if(auth && auth.token)  {
            navigate('/profile')
        }
    }, [auth, navigate])

    return (
        <Fragment>
            <NavBar/>
            <main className="main bg-dark">
                <SignInForm/>
            </main>
            <Footer/>
        </Fragment>
    )
}

export default SignIn