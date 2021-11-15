
import React from 'react';
import {auth} from "fbase"; // eslint-disable-line no-unused-vars
import AuthForm from 'components/AuthForm';

import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    // eslint-disable-line no-unused-vars
    } from "@firebase/auth";

const Auth = () =>{
    
 const onSocialClick =  async (event) =>{
     const {target:{name},
    } = event;
    let provider;
    if(name === "Google"){
        provider = new GoogleAuthProvider();
    }else if(name === "Github"){
        provider = new GithubAuthProvider();
    }
    await signInWithPopup(auth, provider);
 };
    return (
      
<div>

    <AuthForm />    
    <div>
        <button name="Google" onClick ={onSocialClick} >Continue with Google</button>
        <button name="Github" onClick ={onSocialClick} >Continue with Github</button>
    </div>
</div>
    );
} 


export default Auth;