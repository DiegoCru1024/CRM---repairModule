import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/loginPage/loginPage";
import DashboardPage from "./components/dashboardPage/dashboardPage";
import RequestList from "./components/listRequest/listRequest";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<LoginPage/>}/>
                <Route path={'/dashboard'} element={<DashboardPage/>}/>
                <Route path={'/requestList'} element={<RequestList/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
