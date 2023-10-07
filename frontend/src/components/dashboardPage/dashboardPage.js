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

export default function DashboardPage() {
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
                            <Bar dataKey="quantity" name="Cantidad" fill="#82ca9d"/>
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
                        <tr>
                            <td>00001</td>
                            <td>07/10/2023</td>
                            <td>75571217</td>
                            <td>558440125</td>
                            <td>Dispositivo no enciende</td>
                            <td>Pendiente</td>
                        </tr>
                        <tr>
                            <td>00002</td>
                            <td>15/09/2023</td>
                            <td>81234567</td>
                            <td>123456789</td>
                            <td>Problema de red</td>
                            <td>En proceso</td>
                        </tr>
                        <tr>
                            <td>00003</td>
                            <td>28/08/2023</td>
                            <td>63548921</td>
                            <td>987654321</td>
                            <td>Pantalla rota</td>
                            <td>Completado</td>
                        </tr>
                        <tr>
                            <td>00004</td>
                            <td>03/08/2023</td>
                            <td>98765432</td>
                            <td>456789123</td>
                            <td>Batería agotada</td>
                            <td>Pendiente</td>
                        </tr>
                        <tr>
                            <td>00005</td>
                            <td>20/07/2023</td>
                            <td>12348765</td>
                            <td>321654987</td>
                            <td>Problema de software</td>
                            <td>En proceso</td>
                        </tr>
                        <tr>
                            <td>00006</td>
                            <td>11/07/2023</td>
                            <td>56473829</td>
                            <td>789456123</td>
                            <td>Pantalla en blanco</td>
                            <td>Completado</td>
                        </tr>
                        <tr>
                            <td>00007</td>
                            <td>02/07/2023</td>
                            <td>98761234</td>
                            <td>654321987</td>
                            <td>Problema de sonido</td>
                            <td>Pendiente</td>
                        </tr>
                        <tr>
                            <td>00008</td>
                            <td>14/06/2023</td>
                            <td>65439876</td>
                            <td>789123456</td>
                            <td>Cámara defectuosa</td>
                            <td>En proceso</td>
                        </tr>
                        <tr>
                            <td>00009</td>
                            <td>30/05/2023</td>
                            <td>34561234</td>
                            <td>987654789</td>
                            <td>Problema de carga</td>
                            <td>Completado</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}