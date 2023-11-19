import React, { useState } from 'react';
import SideBar from '../sideBarComponent/sideBar';
import EditModal from './EditModal';
import styles from './requestTechnicSolicitud.css';

export default function RequestTechnicSolicitud() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    // const openEditModal = (rowData) => {
    //     setSelectedRow(rowData);
    //     setEditModalOpen(true);
    //   };
    //   const closeEditModal = () => {
    //     setSelectedRow(null);
    //     setEditModalOpen(false);
    //   };
    // const toggleMenu = () => {
    //     setMenuVisible(!menuVisible);
    // };
    // const saveEditedValues = (editedValues) => {
    //     console.log('Guardando valores editados:', editedValues);
    //   };
    return (
        <div className={styles.mainContainer}>
            <SideBar />
            <div className={styles.requestListContainer}>
                <div className={styles.listContainer}>
                    <h2>Lista de solicitudes emitidas</h2>
                </div>
                <div className={styles.tableContainer}>
                    <div className={'cuadro'}>
                        <div className={styles.table}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>FECHA</th>
                                        <th>TECNICO</th>
                                        <th>DETALLES</th>
                                        <th>ESTADO</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>00001</td>
                                        <td>21/10/2023</td>
                                        <td>Técnico 01</td>
                                        <td>PDF</td>
                                        <td>
                                            <div className={`${styles.estadoButton} ${styles.verde}`}>Proceso</div>
                                        </td>
                                        <td>
                                            <div className={styles.actions}>
                                                <button onClick={toggleMenu} className={styles.menuButton}>
                                                    ⋮
                                                </button>
                                                {menuVisible && (
                                                    <div className={styles.menu}>
                                                        <button onClick={() => console.log('Ver')} className={`${styles.actionButton} ${styles.verButton}`}>
                                                            Ver
                                                        </button>
                                                        <button onClick={() => console.log('Editar')} className={`${styles.actionButton} ${styles.editarButton}`}>
                                                            Editar
                                                        </button>
                                                        <button onClick={() => console.log('Borrar')} className={`${styles.actionButton} ${styles.borrarButton}`}>
                                                            Borrar
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
