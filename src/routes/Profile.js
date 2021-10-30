import React from 'react';
import { auth } from 'fbase';
import { useEffect } from 'react';

const Profile = ({ userObj}) => {
    const history = userHistory();

    const onLogOutClick =() =>{
        auth.signOut();
        history.push("/");
    };
    useEffect(()=> {},[]);
    
    
    return (
        <>
        <button onClick ={onLogOutClick}>Log out</button>
        </>
        );
}

   
export default Profile         