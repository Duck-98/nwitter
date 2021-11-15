import { dbService } from 'fbase';
import React,{useState, useEffect} from "react";
import {collection,query, onSnapshot,orderBy} from "firebase/firestore";
import Nweet from "components/Nweet"
import NweetFactory from 'components/NweetFactory';


const Home = ({userObj}) => {
    
    const [nweets, setNweets] = useState([]); //  트윗들을  상태로 받아서 보관해야하기 때문에 배열로 usestate 생성
    
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

return (
 <>   
    <NweetFactory userObj={userObj} />
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
</>
    );
};


export default Home;