import React from 'react';
import SideBar from '../sideBarComponent/sideBar';
import styles from './requestList.module.css';


export default function RequestList() {
    return (
        <div className={styles.mainContainer}>
            <SideBar />
            <div className={styles.requestListContainer}>
                <div className={styles.listContainer}>
                    <h2>Lista de solicitudes emitidas</h2>
                </div>
                <div className={styles.tableContainer}>
                    <div className={'cuadro'}>
                        <div className={'busqueda'}></div>
                        <div className={'barra-filtros'}></div>
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
                                        <td>#11223344L</td>
                                        <td>2023-10-15</td>
                                        <td>Juan Luis Guerra Seijas</td>
                                        <td>Técnico A</td>
                                        <td>Detalles del pedido</td>
                                        <td>
                                            <div className={styles.estadoButton + ' ' + styles.anaranjado}>Proceso</div>
                                        </td>
                                        <td><button>⋮</button></td>
                                    </tr>
                                    <tr>
                                        <td>#22334455p</td>
                                        <td>2023-10-15</td>
                                        <td>Jose Luis Perez Albela</td>
                                        <td>Técnico B</td>
                                        <td>Detalles del pedido</td>
                                        <td>
                                            <div className={styles.estadoButton + ' ' + styles.verde}>Pendiente</div>
                                        </td>
                                        <td><button>⋮</button></td>
                                    </tr>
                                    {/* Agrega más filas según sea necesario */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



