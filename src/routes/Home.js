import { dbService } from 'fbase';
import React,{useState, useEffect} from "react";
import {addDoc, collection,getFirestore,query, onSnapshot,orderBy} from "firebase/firestore";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]); //  트윗들을  상태로 받아서 보관해야하기 때문에 배열로 usestate 생성
    
    useEffect(() => {
        onSnapshot(
        query(collection(dbService, "nweets"), orderBy("createdAt", "desc")),
        (snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
        setNweets(nweetArray);
        }
        );
        }, []);


    const onSubmit = async (e) => {
        try{
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

        setNweet("");
    };
    const onChange = (event) =>{
        const {target : {value},
        }= event;
        setNweet(value);
    };
    console.log(nweets);

return (
 <>   
<div>
    <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type = "text" placeholder ="what's on your mind" maxLength={120} />
        <input type="submit" value="nweet"/>
    </form>
    <div> 
        {nweets.map((nweet) => (
// map 함수를 이용하여 nweets 배열을 순회하면서 jsx를 반환하게 만들어서 트윗 배열들을 웹에 나타냄.
        <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
        </div>
            ))}
    </div>
</div>
</>
    );
};



export default Home;
