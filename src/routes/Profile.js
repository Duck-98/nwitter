import React from 'react';
import { auth,dbService } from 'fbase';
import { useEffect , useState} from 'react';
import {useHistory} from 'react-router-dom';
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from '@firebase/auth';

const Profile = ({userObj, refreshUser}) => {
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
            refreshUser();
            }  // 유저이름과 새로운 이름이 같지 않으면 firebase의 updateProfile을 이용하여 새로운 이름으로 업데이트해줌.
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