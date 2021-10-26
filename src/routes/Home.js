import { dbService , storageService} from 'fbase';
import React,{useState, useEffect, useRef} from "react";
import {addDoc, collection,query, onSnapshot,orderBy} from "firebase/firestore";
import Nweet from "components/Nweet"
import {v4 as uuid} from "uuid";
import {ref, uploadingString} from "firebase/storage";


const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]); //  트윗들을  상태로 받아서 보관해야하기 때문에 배열로 usestate 생성
    const [attachment, setAttachment] = useState(""); // 사진파일 url을 관리하기 위한 state
    useEffect(() => {
        onSnapshot( // OnSnapshot 함수를 이용하여 모든 스냅샷을 반환함.
        query(collection(dbService, "nweets"), orderBy("createdAt", "desc")),
        (snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id, // map 함수를 이용하여 스냅샷에서 원하는 데이터만 뽑아서 배열화 시킨 후 화면에 나타냄.
        ...doc.data(), // 전에 사용했던 Foreach함수는 매 순회마다 setNweets를 사용해야하지만, map함수는 순회하면서 만든 배열을 반환하므로
                        // 반환한 배열을 1번만 setNweet함수에 전달하면 되기 때문에 훨씬 효율적이다.
        }));
        setNweets(nweetArray);
        }
        );
        }, []);


    const onSubmit = async (e) => {
       /* try{
       e.preventDefault();
       
       const docRef = await addDoc(collection(dbService, "nweets"),
            {
            nweet,
            createdAt: Date.now(),
            creatorId : userObj.uid, // db에 유저아이디 추가
        }); // 데이터베이스 생성 
        console.log("Document Written with Id:", docRef.id);
        }catch(error){
            console.log("Error adding document", error)
        }
        setNweet("") */
        const fileRef = ref(storageService,
        `${userObj.uid}/${v4()}`); // 스토리지 레퍼런스 호출

        const response = await uploadingString(fileRef, attachment, "data_url");
        console.log(response);
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
            } = finishedEvent;ㅇ
            setAttachment(result);
        };
        reader.readAsDataURL(theFile); // 파일 정보를 인자로 받아 파일 위치를 url로 반환해줌.
    }; // 사진 파일 업로드 코드
    
    const fileInput = useRef(); //  이미지 파일명을 지우기 위해 useRef 훅 사용

    const onClearPhoto= () =>{
        setAttachment("");
        fileInput.current.value = "";
    } 
    



return (
 <>   
<div>
    <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type = "text" placeholder ="what's on your mind" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput} />
        <input type="submit" value="nweet"/>
        
         {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearPhoto}>Clear</button>
          </div>
        )}

    </form>
    <div> 
        {nweets.map((nweet) => (
// map 함수를 이용하여 nweets 배열을 순회하면서 jsx를 반환하게 만들어서 트윗 배열들을 웹에 나타냄.
        <Nweet 
        key={nweet.id} 
        nweetObj={nweet}
        isOwner={nweet.creatorId === userObj.uid}
         // isOwner  nweet.creatorId === userObj.uid가 같아야 권한을 줄 수 있게 설정.
        />
            ))}
    </div>
</div>
</>
    );
};



export default Home;
