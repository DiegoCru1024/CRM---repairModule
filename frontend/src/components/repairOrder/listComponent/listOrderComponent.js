import React from "react";
import {useNavigate} from "react-router-dom";
import styles from './listOrderComponent.module.scss'
import {FaCirclePlus} from "react-icons/fa6";

export default function ListOrderComponent({data}) {

    const navigate = useNavigate()
    const addRepairOrder = (guid) => {
        navigate(`/repairOrder/submit/${guid}`)
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Cancelado':
                return styles.cancelado;
            case 'Pendiente':
                return styles.pendiente;
            case 'Resuelto':
                return styles.resuelto;
            case 'En Progreso':
                return styles.progreso;
            case 'Notificado':
                return styles.notificado;
            default:
                return '';
        }
    }

    return (
        <div className={styles.tableContainer}>
            <table>
                <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Orden de Venta</th>
                    <th>Producto</th>
                    <th>Fecha de Creación</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {data
                    .filter(item => item.status === 'Pendiente')
                    .map((item, index) => (
                        <tr key={index}>
                            <td>{item.clientId}</td>
                            <td>{item.purchaseOrderId}</td>
                            <td>{item.productId}</td>
                            <td>{item.createdAt}</td>
                            <td>
                                <p className={`${styles.estadoButton} ${getStatusStyle(item.status)}`}>
                                    {item.status}
                                </p>
                            </td>
                            <td className={styles.menuAcciones}>
                                <button className={styles.buttonDetails} onClick={() => addRepairOrder(item.id)}>
                                    <FaCirclePlus/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
