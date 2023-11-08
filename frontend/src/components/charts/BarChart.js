import styles from "../dashboardPage/dashboardPage.module.css";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default function BarChartComponent({data}) {
    return (
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
    )
}