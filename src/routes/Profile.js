import React from 'react';
import { auth } from 'fbase';

const Profile = () => <span>Profile</span> // eslint-disable-line no-unused-vars

export default () => {
    const onLogOutClick = () => auth.signOut();
    return (
    <>
    <button onClick ={onLogOutClick}>Log out</button>
    </>
    );
};