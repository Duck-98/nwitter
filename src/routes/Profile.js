import React from 'react';
import { auth,dbService } from 'fbase';
import { useEffect } from 'react';
import { collection, getDocs, query, where } from "@firebase/firestore";

const Profile = ({ userObj}) => {
    const history = userHistory();

    const onLogOutClick =() =>{
        auth.signOut();
        history.push("/");
    };
    const getMyNweets = async () => {
        const q = query(
        collection(dbService, "nweets"),
        where("creatorId", "==", userObj.uid) // where -> 파이어베이스에서 사용
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        });
        };

    
    useEffect(()=> {
        getMyNweets();
    },[]);
    
    
    return (
        <>
        <button onClick ={onLogOutClick}>Log out</button>
        </>
        );
    }

   
export default Profile         