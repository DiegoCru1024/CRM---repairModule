import SideBar from "../sideBarComponent/sideBar"
import styles from './dashboardPage.module.css'
import {useEffect, useState} from "react";
import DashboardDataFacade from "./dashboardDataFacade";
import PieChartComponent from "../charts/PieChart";
import BarChartComponent from "../charts/BarChart";

export default function DashboardPage() {
    const dataFacade = new DashboardDataFacade();
    const [lastRequests, setLastRequests] = useState([])

    useEffect(() => {
        dataFacade.getLastRequests().then((data) => {
            setLastRequests(data);
            console.log('Solicitudes recibidas...');
        });
    }, [])

    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <div className={styles.dashboardContainer}>
                <BarChartComponent data={dataFacade.getBarChartData()}/>
                <PieChartComponent data={dataFacade.getPieChartData()}/>
                <div className={styles.listContainer}>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha de Emisión</th>
                            <th>Cliente</th>
                            <th>Venta</th>
                            <th>Detalles</th>
                            <th>Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lastRequests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.id}</td>
                                <td>{request.createdAt}</td>
                                <td>{request.clientId}</td>
                                <td>{request.purchaseOrderId}</td>
                                <td>{request.motive}</td>
                                <td>{request.deviceStatus}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}