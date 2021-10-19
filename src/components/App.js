import AppRouter from 'components/Router';
import {useState, useEffect} from "react";
import { auth } from "fbase";

 

function App() {
  
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser)
  
  useEffect(() => {
    auth.onAuthStateChanged((user) =>{
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false)
      }
      setInit(true);
    });
  }, []);

  return (
    <>
  {init ? <AppRouter isLoggedIn = {isLoggedIn} /> : "Initialzizing.."}
  <footer>&copy; {new Date().getFullYear()} Nwitter</footer>

   </>
  )
}

export default App;
