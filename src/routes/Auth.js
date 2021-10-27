
import React, { useState } from 'react';
import {auth, firebaseInstance} from "fbase"; // eslint-disable-line no-unused-vars


import {
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    getAuth,
    provider // eslint-disable-line no-unused-vars
    } from "@firebase/auth";

const Auth = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setnewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
       const {
           target:{name, value},
          }   = event;
          if(name === "email"){
              setEmail(value);
          }else if(name === "password"){
              setPassword(value);
          }
        }
    const onSubmit = async (event) =>{ // 서버로 값을 요청해서 받는 시간이 걸리기 때문에 async를 사용
        event.preventDefault();
        try{
           const auth = getAuth(); 
           let data; 
           if(newAccount) {
            const data = await createUserWithEmailAndPassword(auth, email, password); // eslint-disable-line no-unused-vars
            } else {
            const data = await signInWithEmailAndPassword(auth, email, password); // eslint-disable-line no-unused-vars
            }
            console.log(data);
        }catch (error){
            setError(error.message); // 같은 이메일계정으로 다시 만든다면 오류가 발생
        }
    };
 const toggleAccount = () =>{
     setnewAccount((prev) => !prev);
 }   
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
<form onSubmit = {onSubmit}>
    <input name="email" type ="text" placeholder="Email" required value={email} onChange={onChange}/>
    <input name="password" type ="password" placeholder="Password" required value = {password} onChange={onChange}/>
    <input type ="submit" value={newAccount ? "create Account" : "Login"} />
    {error} 
</form>
<span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account" } </span>  

<div>
    <button name="Google" onClick ={onSocialClick} >Continue with Google</button>
    <button name="Github" onClick ={onSocialClick} >Continue with Github</button>
</div>
</div>
    );
} 


export default Auth;