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
        
        <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
          <input
            onChange={onChange}
            type="text"
            autoFocus
            placeholder="Display name"
            value={newDisplayName}
            className="formInput"
          />
          <input
            type="submit"
            value="Update Profile"
            className="formBtn"
            style={{
              marginTop: 10,
            }}
          />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
        </span>
        

        </div>
        
        );
    
    }
   
export default Profile         