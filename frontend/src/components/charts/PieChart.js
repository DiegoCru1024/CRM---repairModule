import styles from "../dashboardPage/dashboardPage.module.css";
import {Cell, Legend, Pie, ResponsiveContainer, Tooltip, PieChart} from "recharts";

export default function PieChartComponent({data}) {
    return (
        <div className={styles.chartContainer}>
            <h3>Estado de Solicitudes</h3>
            <ResponsiveContainer width="70%" height="70%">
                <PieChart width={400} height={400}>
                    <Pie data={data} cx="50%" cy="50%" outerRadius={120} innerRadius={80} paddingAngle={5}
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
    )
}