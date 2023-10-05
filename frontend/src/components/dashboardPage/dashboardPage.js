import SideBar from "../sideBarComponent/sideBar"
import styles from './dashboardPage.module.css'
import ReactECharts from 'echarts-for-react'
import {useState} from "react";

export default function DashboardPage() {
    const [data, setData] = useState([
        {
            name: "Barra 1",
            value: 100,
        },
        {
            name: "Barra 2",
            value: 200,
        },
        {
            name: "Barra 3",
            value: 300,
        },
    ]);

    const option = {
        title: {
            text: "Gráfico de barras con datos de prueba",
        },
        tooltip: {},
        xAxis: {
            type: "category",
            data: ["Barra 1", "Barra 2", "Barra 3"],
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                name: "Datos",
                type: "bar",
                data: data,
            },
        ],
    };

    return (
        <div className={styles.mainContainer}>
            <SideBar/>

            <div className={styles.dashboardContainer}>
                <div>
                    <ReactECharts option={option}/>
                </div>
                <h1>DashBoard</h1>
                <h1>DashBoard</h1>
                <h1>DashBoard</h1>
            </div>
        </div>
    )
}