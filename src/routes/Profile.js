import React from 'react';
import { auth,dbService } from 'fbase';
import { useEffect , useState} from 'react';
import {useHistory} from 'react-router-dom';
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from '@firebase/auth';

const Profile = ({userObj}) => {
    const history = useHistory();
    const [newDisplayName, setnewDisplayName] = useState(userObj.displayName);
    const onLogOutClick =() =>{
        auth.signOut();
        history.push("/");
    };
    const onChange = (event) =>{
        const {
            target : {value},
        } = event;
        setnewDisplayName(value);
    }
    const onSubmit = async (event) =>{
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, { displayName: newDisplayName });
            }
    }
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
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName}/>
            <input  type ="submit" value ="Update Profile"/>
        </form>

        <button onClick ={onLogOutClick}>Log out</button>
        


        </>
        );
    
    }
   
export default Profile         