import   './editProfile.css';

import React,  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reduxStore/userSlice';

export default function EditProfile({user, closeEdit}) {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const handleFirstNameChange = (e) => {
        e.preventDefault();
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        e.preventDefault();
        setLastName(e.target.value);
    }

    const handleSave = (e) =>  {
        e.preventDefault();
        //  will update user in store and server 
        if(auth.token) {
            const updateData = {
                user: {
                    firstName: firstName,
                    lastName: lastName
                }
            }
            // update user in server   
            dispatch(updateUser(updateData))
        }
        closeEdit();
    }

    const handleCancel = (e) =>  {
        e.preventDefault();
        // this calls a function assigned to closeEdit prop in parents component
        closeEdit();
    }

  return (
    <div className="edit-form">
        <h1 className='edit-title'>Welcome back</h1>
        <form>
            <div className='inputs'>
                <input className='input-edit' type='text' placeholder='Prénom' value={firstName} onChange={handleFirstNameChange} ></input>
                <input className='input-edit' type='text' placeholder='Nom' value={lastName} onChange={handleLastNameChange} ></input>
            </div>
            <div   className='buttons'>
                <button className='button button-edit' type='submit' onClick={handleSave}>Save</button>
                <button className='button button-edit' onClick={handleCancel}>Cancel</button>
            </div> 
        </form>      
    </div>
  )
}
