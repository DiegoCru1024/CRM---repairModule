import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/loginPage/loginPage";
import DashboardPage from "./components/dashboardPage/dashboardPage";
import RepairRequestPlataform from "./components/repairRequestPlatform/repairRequestPlataform";
import RequestList from "./components/requestList/requestList";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<LoginPage/>}/>
                <Route path={'/dashboard'} element={<DashboardPage/>}/>
                <Route path={'requestList'} element={<RequestList/>}/>
                <Route path={'/repairRequest'} element={<RepairRequestPlataform/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
