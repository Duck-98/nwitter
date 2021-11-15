import React from 'react'
import { HashRouter as Router, Route, Switch,Redirect} from "react-router-dom";// as를 이용하여 HashRouter의 이름을 Router로 변경.
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from './Navigation';
import Profile from 'routes/Profile';


const AppRouter = ({isLoggedIn, userObj,refreshUser}) =>{ //Router을 이미 정의했기 때문에 다른 이름으로 정의
    //상위 컴포넌트에서 받은 프롭스는 구조분해 할당으로 사용
   
    return( // switch를 이용하면 여러가지 라우트 중 하나만 렌더링하게 해줌.
        <Router>
            {isLoggedIn &&<Navigation userObj={userObj}/>} 
            {/* && -> 로그인이 맞다면 Navigation => true*/}
            <Switch>  
                {isLoggedIn ?( // 로그인 상태 시
                <div
                style={{
                  maxWidth: 890,
                  width: "100%",
                  margin: "0 auto",
                  marginTop: 80,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                    <Route exact path ="/">  
                        <Home userObj={userObj} />
                    </Route>  
                    <Route exact path ="/profile">  
                    <Profile refreshUser={refreshUser} userObj={userObj} />
                </Route>
                <Redirect from="*" to="/" />
                </div> 
                ) : ( // 비로그인 상태 시
                    <>
                    <Route exact path ="/"> 
                        <Auth />
                    </Route>   
                    <Redirect from="*" to="/" />
                    </>
                )}
            </Switch>
        </Router>
    )
}
export default AppRouter;  