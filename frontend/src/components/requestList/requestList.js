import React from 'react';
import { useState } from 'react';
import SideBar from '../sideBarComponent/sideBar';
import styles from './requestList.module.css';

export default function RequestList() {
    /*
    const [id, setId] = useState();
    const [fecha, setFecha] = useState();
    const [cliente, setCliente] = useState("");
    const [tecnico, setTecnico] = useState("");
    const [detalles, setDetalles] = useState(); // por confirmar

    const [employeesList, setEmployeesList] = useState([]);
    */
    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <div className={styles.requestListContainer}>
                <div className={styles.listContainer}>
                    <h2>Lista de solicitudes emitidas</h2>
                </div>
                <div className={styles.tableContainer}>
                    <div className={'cuadro'}>
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
                                    <tr>
                                        <td>00001</td>
                                        <td>21/10/2023</td>
                                        <td>Juan Manuel Gonzales</td>
                                        <td>Tecnico 01</td>
                                        <td>PDF</td>
                                        <td>
                                            <div className={styles.estadoButton + ' ' + styles.verde}>Proceso</div>
                                        </td>
                                        <td>⋮</td>
                                    </tr>
                                </tbody>
                                {/*
                                <tbody>
                                    {
                                        employeesList.map((val, key) => {
                                            return <tr key={val.id}>
                                                <td>{val.id}</td>
                                                <td>{val.fecha}</td>
                                                <td>{val.cliente}</td>
                                                <td>{val.tecnico}</td>
                                                <td>{val.detalles}</td>
                                                <td>
                                                    <div className={styles.estadoButton + ' ' + styles.anaranjado}>Proceso</div>
                                                </td>
                                                <td>:</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                                */}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



