import { dbService } from 'fbase';
import React,{useState, useEffect} from "react";
import {addDoc, collection,getDocs,query} from "firebase/firestore";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]); //  트윗들을  상태로 받아서 보관해야하기 때문에 배열로 usestate 생성
    const getNweets = async ()=> {
        const q = query(collection(dbService,"nweets"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        const nweetObj = { //nweetObj => 트윗 내용 
            ...doc.data(), // ES6 spread attribute 기능(전개구문)
            id:doc.id,
        } // 중요!!) querySnapShot에 있는 doc(트윗 갯수)가 5개면 forEach함수는 5번 순회가 됨.
        // 이때 nweets에 트윗 데이터를 쌓고 싶으면 순회 이전의 nweets와 순회중인 데이터를 [nweetObj,...prev]처럼 합침.
         setNweets(prev => [nweetObj,...prev]);   
         // 그렇기 때문에 순회 이전의 nweets는 setNweet에 인자로 전달된 함수의 첫번째 인자로 넘어오게됨.
         // 즉 nweetobj에는 최신 트윗이 0번째 배열로 위치하고 이전에 온 트윗은 1번째 배열에 위치하게 됨.
        });
    };
    useEffect(() => {
        getNweets();
    
    }, [])
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
