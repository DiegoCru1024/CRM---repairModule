import styles from "../requestList/requestList.module.css";
import React from "react";

export default function ListComponent({data}) {
    return (
        <div className={styles.table}>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>FECHA</th>
                    <th>CLIENTE</th>
                    <th>TECNICO</th>
                    <th>DETALLES</th>
                    <th>ESTADO</th>
                    <th>ACCION</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.date}</td>
                        <td>{item.name}</td>
                        <td>{item.technicianID}</td>
                        <td>{item.details}</td>
                        <td>
                            <div className={`${styles.estadoButton} ${styles.anaranjado}`}>
                                Proceso
                            </div>
                        </td>
                        <td>
                            <button>⋮</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
