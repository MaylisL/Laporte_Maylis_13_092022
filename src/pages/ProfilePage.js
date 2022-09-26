import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components  and  functions
import NavBar from "../components/NavBar";
import UserCard from "../components/UserCard";
import Footer from "../components/Footer";
import EditProfile from "../components/EditProfile";
import { loadUser } from "../reduxStore/userSlice";
import { accounts } from '../assets/static-content';
// styles
import './profilePage.css';

function ProfilePage()  {
    const authToken  = useSelector((state) => state.auth.token)
    const user = useSelector((state) => state.user)
    const fullName = `${user?.firstName} ${user?.lastName}`
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false)

    const closeEditMode = () => {
        setEdit(false)
    }

    const openEditMode = () => {
        setEdit(true)
    }

    useEffect(() => {
        if(!authToken) {
            // if no authToken will redirect to login
            navigate('/login')
        } else if (!user.success && !user.loading) {
            // only try loadUser if not loaded successfully and is not already loading
            dispatch(loadUser(authToken))
        }
    }, [authToken, user, dispatch, navigate])

    return (
        <React.Fragment>
            <NavBar/>
            {user.success ? (
                <main className="main bg-dark">
                    {edit ? <EditProfile user={user} closeEdit={closeEditMode}/> : (<div className="header">
                        <h1>Welcome back<br />{fullName}</h1>
                        <button className='button' onClick={openEditMode}>Edit Name</button>
                    </div>)}
                    <h2 className="sr-only">Accounts</h2>
                    {accounts.map((account, index) => {
                            return <UserCard key={index} title={account.title} amount={account.amount} description={account.description} />
                        })}
                </main>)
            :  <h1>LOADING...</h1> }
            <Footer/>
        </React.Fragment>

    )
}

export default ProfilePage;