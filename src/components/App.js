import AppRouter from 'components/Router';
import {useState, useEffect} from "react";
import { auth } from "fbase";

 

function App() {
  
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser)
  const [userObj, setUserObj] = useState(null); // 로그인 정보관리를 위한 useState


  useEffect(() => {
    auth.onAuthStateChanged((user) =>{
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      }else{
        setIsLoggedIn(false)
      }
      setInit(true);
    });
  }, []);

  return (
    <>
  {init ? <AppRouter isLoggedIn = {isLoggedIn} userObj={userObj} /> : "Initialzizing.."} 
  {/* userObj를 AppRouter을 이용하여 보냄 */}

   </>
  )
}

export default App;
