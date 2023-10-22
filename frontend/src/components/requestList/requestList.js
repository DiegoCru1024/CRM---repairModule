import React from 'react';
import { useState } from 'react';
import SideBar from '../sideBarComponent/sideBar';
import styles from './requestList.module.css';


export default function RequestList() {

    const [id, setId] = useState("");
    const [fecha, setFecha] = useState();
    const [cliente, setCliente] = useState("");
    const [tenico, setTecnico] = useState("");
    const [detalles, setDetalles] = useState(""); // por aclarar

    const [employeesList, setEmployeesList] = useState([]);

    return (
        <div className={styles.mainContainer}>
            <SideBar />
            <div className={styles.requestListContainer}>
                <div className={styles.listContainer}>
                    <h2>Lista de solicitudes emitidas</h2>
                </div>
                <div className={styles.tableContainer}>
                    <div className={styles.table}>
                        <table >
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
                                {
                                    employeesList.map((val,key) => {
                                        return <tr key={val.id}>
                                            <td>{val.id}</td>
                                            <td>{val.fecha}</td>
                                            <td>{val.cliente}</td>
                                            <td>{val.tecnico}</td>
                                            <td>{val.detalles}</td>
                                            <td>{val.estado}</td>
                                            <td>:</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}



