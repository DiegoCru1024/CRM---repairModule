import SideBar from "../sideBarComponent/sideBar";
import styles from './dashboardPage.module.css';
import {useEffect, useState} from "react";
import DashboardDataFacade from "./dashboardDataFacade";
import PieChartComponent from "../charts/PieChart";
import BarChartComponent from "../charts/BarChart";

export default function DashboardPage() {
    const dataFacade = new DashboardDataFacade();
    const [lastRequests, setLastRequests] = useState([]);
    const [statusData, setStatusData] = useState([])
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        dataFacade.getLastRequests().then((data) => {
            setLastRequests(data);
        });

        dataFacade.getPieChartData().then((data) => {
            setStatusData(data)
        })

        setDataLoaded(true);
    }, []);

    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <div className={styles.dashboardContainer}>
                {dataLoaded && (
                    <>
                        <BarChartComponent data={dataFacade.getBarChartData()}/>
                        <PieChartComponent data={statusData}/>
                    </>
                )}
                <div className={styles.listContainer}>
                    <table>
                        <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Fecha de Emisión</th>
                            <th>Venta</th>
                            <th>Descripción</th>
                            <th>Motivo</th>
                            <th>Estado del Dispositivo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lastRequests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.clientId}</td>
                                <td>{request.createdAt}</td>
                                <td>{request.purchaseOrderId}</td>
                                <td>{request.description}</td>
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
