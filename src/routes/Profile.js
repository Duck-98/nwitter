import React from 'react';
import { auth,dbService } from 'fbase';
import { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { collection, getDocs, query, where } from "@firebase/firestore";
const Profile = ({userObj}) => {
    const history = useHistory();
    const onLogOutClick =() =>{
        auth.signOut();
        history.push("/");
    };
    const getMyNweets = async () => {
        const q = query(
            collection(dbService, "nweets"),
            where("creatorId", "==", userObj.uid)
            );

        const querySnapshot = await getDocs(q); // querysnapshot-> firebase 쿼리함수. 
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data())
            ;
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