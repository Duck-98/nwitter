import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from '@fortawesome/free-brands-svg-icons';

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
      
<div className="authContainer">
    <FontAwesomeIcon
     icon={faTwitter}
     color={"#04AAFF"}
     size="3x"
     style={{marginBottom : 30}}
    />
    <AuthForm />    
    <div className="authBtns">
        <button name="Google" className="authBtn" onClick ={onSocialClick} >
            Continue with Google<FontAwesomeIcon icon={faGoogle}/></button>
        <button name="Github" className="authBtn" onClick ={onSocialClick} >
            Continue with Github<FontAwesomeIcon icon={faGithub}/></button>
    </div>
</div>
    );
} 


export default Auth;