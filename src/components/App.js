import AppRouter from 'components/Router';
import {useState} from "react";
import { auth } from "fbase";

 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser)
  
  return (
    <>
  <AppRouter isLoggedIn = {isLoggedIn} />
  <footer>&copy; {new Date().getFullYear()} Nwitter</footer>

   </>
  )
}

export default App;
