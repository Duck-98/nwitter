import React ,{useState}from "react";
import { dbService } from 'fbase';
import {doc,deleteDoc,updateDoc} from "firebase/firestore";



const Nweet = ({nweetObj, isOwner}) =>{
    const [editing, setEditing] = useState(false);
    // 이 코드는 수정 버튼을 클릭했을 때 입력란과 버튼이 뜨게하는 기준점임.
    const [newNweet, setNewNweet] = useState(nweetObj)
    // 수정할 때 입력란에 기존의 트윗을 나타내기 위한 state
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this tweet?");
        const NweetTextRef = doc(dbService,"nweets", `${nweetObj.id}`); 
        // 데이터베이스에서 트윗의 아이디를 찾기 위한 코드.
        if(ok){
           await deleteDoc(NweetTextRef); // 트윗 삭제기능
        };

    }
    return (
    <div>
        <h4>{nweetObj.nweet}</h4>
        {isOwner && (
            <>
                <button onClick={onDeleteClick}>Delete tweet</button>
                <button>Edit Nweet</button>            
            </>
        )}
    </div>

    );
};

export default Nweet;