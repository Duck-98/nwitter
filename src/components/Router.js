import { HashRouter as Router, Route, Switch} from "react-router-dom";
        // as를 이용하여 HashRouter의 이름을 Router로 변경.
const AppRouter = () =>{ //Router을 이미 정의했기 때문에 다른 이름으로 정의
    return( // switch를 이용하면 여러가지 라우트 중 하나만 렌더링하게 해줌.
        <Router>
            <Switch>  
                <Route/>
            </Switch>
        </Router>
    )
}
export default AppRouter;