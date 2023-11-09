import React from 'react';
import { useState, useEffect } from 'react';
import SideBar from '../sideBarComponent/sideBar';
import styles from './requestList.module.css';


export default function RequestList() {

    const [solicitudes, setSolicitudes] = useState([]);

    // Simula la obtención de datos de otro módulo 
    useEffect(() => {
        // Simulamos la obtención de datos de solicitudes
        const data = [
            { id: 1, fecha: '2023-01-15', cliente: 'Cliente 1', tecnico: 'Técnico 1', detalles: 'Detalles 1', estado: 'Proceso' },
            { id: 2, fecha: '2023-02-20', cliente: 'Cliente 2', tecnico: 'Técnico 2', detalles: 'Detalles 2', estado: 'Completado' },
            { id: 3, fecha: '2023-02-25', cliente: 'Cliente 3', tecnico: 'Técnico 3', detalles: 'Detalles 3', estado: 'Cancelado' },
            { id: 4, fecha: '2023-03-01', cliente: 'Cliente 4', tecnico: 'Técnico 4', detalles: 'Detalles 4', estado: 'Proceso' },
        ];

        setSolicitudes(data);
    }, []);

    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const [mostrarModuloVer, setMostrarModuloVer] = useState(false);
    const [mostrarModuloEditar, setMostrarModuloEditar] = useState(false);

    const alternarOpciones = () => {
        setMostrarOpciones(!mostrarOpciones);
    };

    const manejarClicVer = () => {
        setMostrarModuloVer(true);
        setMostrarModuloEditar(false);
        setMostrarOpciones(false);
    };

    const manejarClicEditar = () => {
        setMostrarModuloEditar(true);
        setMostrarModuloVer(false);
        setMostrarOpciones(false);
    };

    const getEstadoClass = (estado) => {
        if (estado === 'Completado') {
          return styles.Completado;
        } else if (estado === 'Cancelado') {
          return styles.Cancelado;
        } else if (estado === 'Proceso') {
          return styles.Proceso;
        } else {
          return '';
        }
      };      

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
                                        solicitudes.map((val, key) => {
                                            return <tr key={val.id}>
                                                <td>{val.id}</td>
                                                <td>{val.fecha}</td>
                                                <td>{val.cliente}</td>
                                                <td>{val.tecnico}</td>
                                                <td>{val.detalles}</td>
                                                <td>
                                                    <div className={`${styles.estadoButton} ${getEstadoClass(val.estado)}`}>{val.estado}</div>
                                                </td>
                                                <td>
                                                    <div className={styles.campoAccion}>
                                                        <button onClick={alternarOpciones}>︙</button>
                                                        {
                                                            mostrarOpciones && (
                                                                <div className={styles.opcionesCampoAccion}>
                                                                    <button style={{color:'#0C59CF', borderBottom: '1px solid #D6D6D6'}} onClick={manejarClicVer}>Ver</button>
                                                                    <button style={{color:'#629C44'}} onClick={manejarClicEditar}>Editar</button>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {mostrarModuloVer && (
                    <div className={styles.module}>
                        {/* renderiza el módulo de visualización */}
                        <h2>Módulo de Visualización</h2>
                        {/* contenido del módulo de visualización */}
                    </div>
                )}
                {mostrarModuloEditar && (
                    <div className={styles.module}>
                        {/* renderiza el módulo de edición */}
                        <h2>Módulo de Edición</h2>
                        {/* contenido del módulo de edición */}
                    </div>
                )}
            </div>
        </div>
    );
}



