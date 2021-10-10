import { HashRouter as Router, Route, Switch} from "react-router-dom";// as를 이용하여 HashRouter의 이름을 Router로 변경.
import { useState } from 'react';
import Auth from '../routes/Auth';
import Home from '../routes/Home';



const AppRouter = () =>{ //Router을 이미 정의했기 때문에 다른 이름으로 정의
    
    const [isLoggedIn, setisLoggedIn] = useState(false); // useState
    return( // switch를 이용하면 여러가지 라우트 중 하나만 렌더링하게 해줌.
        <Router>
            <Switch>  
                {isLoggedIn ?( // 로그인 상태 시
                    <Route exact path ="/">  
                        <Home />
                    </Route>  
                ) : ( // 비로그인 상태 시
                    <Route exact path ="/"> 
                        <Auth />
                    </Route>   
                )}
            </Switch>
        </Router>
    )
}
export default AppRouter;  