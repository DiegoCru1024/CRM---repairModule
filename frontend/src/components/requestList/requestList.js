import React from 'react';
import SideBar from '../sideBarComponent/sideBar';
import styles from './requestList.module.css';
import ListComponent from "../listComponent/listComponent";


export default function RequestList() {
    const listData = [
        {
            id: 123,
            date: '12/10/2023',
            name: 'Diego Cruces',
            technicianID: 455,
            details: 'Ninguno'

        }   
    ]
    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <div className={styles.requestListContainer}>
                <div className={styles.listContainer}>
                    <h2>Lista de solicitudes emitidas</h2>
                </div>
                <div className={styles.tableContainer}>
                    <div className={'cuadro'}>
                        <div className={'busqueda'}></div>
                        <div className={'barra-filtros'}></div>
                        <ListComponent data={listData}/>
                    </div>
                </div>
            </div>
        </div>
    );
}



