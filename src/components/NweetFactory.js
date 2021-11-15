import { getDownloadURL, ref, uploadString} from "@firebase/storage";
import { storageService } from 'fbase';
import { v4 } from 'uuid';
import React,{useState, useRef} from "react";
import {addDoc, collection} from "firebase/firestore";
import { dbService } from 'fbase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";


const NweetFactory = ({userObj}) =>{
    const [attachment, setAttachment] = useState(""); // 사진파일 url을 관리하기 위한 state
    const [nweet, setNweet] = useState("");

    const onSubmit = async (e) => {
        
        e.preventDefault();
        if (nweet === "") {
            return;
          }
        let attachmentUrl =""
        if(attachment !== ""){
            const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            console.log(getDownloadURL(response.ref));
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const nweetObj = {
            nweet,
            createdAt: Date.now(),
            creatorId : userObj.uid, // db에 유저아이디 추가
            attachmentUrl
        }
        await addDoc(collection(dbService, "nweets"),(nweetObj)); 
        setNweet("");
        setAttachment("");

    };

    
    const onChange = (event) =>{
        const {target : {value},
        }= event;
        setNweet(value);
    };
    const onFileChange = (event) =>{
        const {target : {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader(); 
        reader.onloadend = (finishedEvent) => { 
            const {
                currentTarget  : {result},
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile); // 파일 정보를 인자로 받아 파일 위치를 url로 반환해줌.
    }; // 사진 파일 업로드 코드
    
    const fileInput = useRef(); //  이미지 파일명을 지우기 위해 useRef 훅 사용

    const onClearPhoto= () =>{
        setAttachment("");
        fileInput.current.value = null;
    } 
    
    return(
        <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
        <label for="attach-file" className="factoryInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />
         {attachment && (
           <div className="factoryForm__attachment">
           <img
             src={attachment}
             style={{
               backgroundImage: attachment,
             }}
           />
           <div className="factoryForm__clear" onClick={onClearPhoto}>
             <span>Remove</span>
             <FontAwesomeIcon icon={faTimes} />
           </div>
           </div>
        )}

    </form>
    );
};

export default NweetFactory;