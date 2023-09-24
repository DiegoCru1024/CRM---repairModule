import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/loginPage/loginPage";
import DashboardPage from "./components/dashboardPage/dashboardPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<LoginPage/>}/>
                <Route path={'/dashboard'} element={<DashboardPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
