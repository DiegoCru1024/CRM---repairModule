import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/loginPage/loginPage";
import DashboardPage from "./components/dashboardPage/dashboardPage";
import RequestList from "./components/requestList/requestList";
import RepairRequestPlataform from "./components/repairRequestPlataform/repairRequestPlataform";
import "./assets/scss/app.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<LoginPage />} />
        <Route path={"/dashboard"} element={<DashboardPage />} />
        <Route path={"/requestList"} element={<RequestList />} />
        <Route path={"/repairRequest"} element={<RepairRequestPlataform />} />
      </Routes>
    </BrowserRouter>
  );
export default App;
