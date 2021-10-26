import React ,{useState}from "react";
import { dbService } from 'fbase';
import {doc,deleteDoc,updateDoc} from "firebase/firestore";



const Nweet = ({nweetObj, isOwner}) =>{
    const [editing, setEditing] = useState(false);
    // 이 코드는 수정 버튼을 클릭했을 때 입력란과 버튼이 뜨게하는 기준점임.
    const [newNweet, setNewNweet] = useState(nweetObj.nweet)
    // 수정할 때 입력란에 기존의 트윗을 나타내기 위한 state
    const NweetTextRef = doc(dbService,"nweets", `${nweetObj.id}`); 
    // 데이터베이스에서 트윗의 아이디를 찾기 위한 코드.

    const onDeleteClick = async () => { // 트윗 삭제 함수
        const ok = window.confirm("Are you sure you want to delete this tweet?");        
        if(ok){
           await deleteDoc(NweetTextRef); // 트윗 삭제기능
        };
    }

    const toggleEditing = () => {setEditing((prev) => !prev)}
    
    const onSubmit =  async (event) => {
        event.preventDefault();
        await updateDoc(NweetTextRef,{
        nweet: newNweet,
        });

        setEditing(false);
        console.log(nweetObj.id, newNweet);
    }
    const onChange = (event) => {
        const {
            target : {value},
        } = event;
        setNewNweet(value);
    } // 입력란에 택스트를 입력해야하는 경우 onchange프롭스, 함수 작업을 해야한다.


    return (
    <div>
        {editing ? (
            <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder ="Edit you tweet!" value={newNweet} required />
                <input type ="submit" value="Update tweet"/>
            </form>
            <button onClick={toggleEditing}>Cancel</button>
            </>
        ) : (
            <>
            <h4>{nweetObj.nweet}</h4>
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete tweet</button>
                    <button onClick={toggleEditing}>Edit Nweet</button>            
                </>
            )}
            </>
        )}
    </div>
    );
};

export default Nweet;