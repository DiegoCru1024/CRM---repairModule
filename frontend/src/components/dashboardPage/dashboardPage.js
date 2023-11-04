import SideBar from "../sideBarComponent/sideBar"
import styles from './dashboardPage.module.css'
import {
    Bar,
    BarChart,
    CartesianGrid, Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {useEffect, useState} from "react";
import axios from "axios";

export default function DashboardPage() {
    const [lastRequests, setLastRequests] = useState([])

    useEffect(() => {
        getLastRequests().then(() => {
            console.log('Solicitudes recibidas...')
        })
    }, [])

    const getLastRequests = async () => {
        try {
            const url = "https://reapir-module-crm-230927095955.azurewebsites.net/api/RepairRequest/All"
            const response = await axios.get(url)
            setLastRequests(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const data = [
        {
            name: '05/10',
            quantity: 7,
        },
        {
            name: '06/10',
            quantity: 12,
        },
        {
            name: '07/10',
            quantity: 8,
        },
        {
            name: '08/10',
            quantity: 4,
        },
        {
            name: '09/10',
            quantity: 7,
        },
        {
            name: '10/10',
            quantity: 7,
        },
        {
            name: '11/10',
            quantity: 9,
        },
    ];

    const data2 = [
        {
            name: 'Pendiente',
            quantity: 12
        },
        {
            name: 'En Proceso',
            quantity: 5
        },
        {
            name: 'Completadas',
            quantity: 10
        },
    ]

    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <div className={styles.dashboardContainer}>
                <div className={styles.chartContainer}>
                    <h3>Cantidad de solicitudes por día</h3>
                    <ResponsiveContainer width='70%' height='70%'>
                        <BarChart width={500} height={300} data={data}
                                  margin={{top: 5, right: 20, left: 20, bottom: 5,}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="quantity" name="Cantidad" fill="#002388"/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className={styles.chartContainer}>
                    <h3>Estado de Solicitudes</h3>
                    <ResponsiveContainer width="70%" height="70%">
                        <PieChart width={400} height={400}>
                            <Pie data={data2} cx="50%" cy="50%" outerRadius={120} innerRadius={80} paddingAngle={5}
                                 dataKey="quantity">
                                <Cell key={'cell-0'} fill={'#FF8042'}/>
                                <Cell key={'cell-1'} fill={'#00C49F'}/>
                                <Cell key={'cell-2'} fill={'#FFBB28'}/>
                            </Pie>
                            <Tooltip/>
                            <Legend/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
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
                                <th>{request.id}</th>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}