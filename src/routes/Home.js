import { dbService } from 'fbase';
import React,{useState} from "react";
import {addDoc, collection} from "firebase/firestore";

const Home = () => {
    const [nweet, setNweet] = useState("");

    const onSubmit = async (e) => {
        try{
        e.preventDefault();
        const docRef = await addDoc(collection(dbService, "nweets"),
            {
            nweet,
            createdAt: Date.now(),
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


return (
<div>
    <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type = "text" placeholder ="what's on your mind" maxLength={120} />
        <input type="submit" value="nweet"/>
    </form>

</div>
    );
}



export default Home;
