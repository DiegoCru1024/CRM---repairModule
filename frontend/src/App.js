import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/loginPage/loginPage";
import DashboardPage from "./components/dashboardPage/dashboardPage";
import RepairRequestPlataform from "./components/repairRequestPlataform/repairRequestPlataform";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<LoginPage/>}/>
                <Route path={'/dashboard'} element={<DashboardPage/>}/>
                <Route path={'/RepairRequest'} element={<RepairRequestPlataform/>} />
            </Routes>
        </BrowserRouter>    
    );
}

export default App;
