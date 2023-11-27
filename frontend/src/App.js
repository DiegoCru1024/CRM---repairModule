import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/loginPage/loginPage";
import DashboardPage from "./components/dashboardPage/dashboardPage";
import RequestList from "./components/requestList/requestList";
import RepairRequestPlatform from "./components/repairRequestPlatform/repairRequestPlatform";
import "./assets/scss/app.scss";
import RequestDetails from "./components/requestDetailsComponent/requestDetails";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<LoginPage/>}/>
                <Route path={"/dashboard"} element={<DashboardPage/>}/>
                <Route path={"/requestList"} element={<RequestList/>}/>
                <Route path={"/requestList/:guid"} element={<RequestDetails/>}/>
                <Route path={"/repairRequest"} element={<RepairRequestPlatform/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
