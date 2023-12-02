import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/loginPage/loginPage";
import DashboardPage from "./components/dashboardPage/dashboardPage";
import RequestList from "./components/repairRequest/requestList/requestList";
import RepairRequest from "./components/repairRequest/repairRequest";
import RequestDetails from "./components/repairRequest/requestDetails/requestDetails";
import RequestUpdate from "./components/repairRequest/requestUpdate/requestUpdate";
import RepairOrder from "./components/repairOrder/repairOrder";
import CreateRepairOrder from "./components/repairOrder/createRepairOrder/createRepairOrder";
import "./assets/scss/app.scss";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<LoginPage/>}/>
                <Route path={"/dashboard"} element={<DashboardPage/>}/>
                <Route path={"/requestList"} element={<RequestList/>}/>
                <Route path={"/requestList/view/:guid"} element={<RequestDetails/>}/>
                <Route path={"/requestList/edit/:guid"} element={<RequestUpdate/>}/>
                <Route path={"/repairRequest"} element={<RepairRequest/>}/>
                <Route path={"/repairOrder"} element={<RepairOrder/>}/>
                <Route path={"/repairOrder/submit/:guid"} element={<CreateRepairOrder/>}/>

            </Routes>
        </BrowserRouter>
    )
}

export default App;
