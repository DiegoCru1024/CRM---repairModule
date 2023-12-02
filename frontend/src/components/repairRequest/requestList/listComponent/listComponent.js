import styles from "./listComponent.module.scss";
import React from "react";
import {useNavigate} from "react-router-dom";
import {FaEye, FaPencil} from "react-icons/fa6";

export default function ListComponent({data}) {
    const navigate = useNavigate()
    const showDetails = (guid) => {
        navigate(`/requestList/view/${guid}`)
    }

    const editRequest = (guid) => {
        navigate(`/requestList/edit/${guid}`)
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Cancelado':
                return styles.cancelado;
            case 'Pendiente':
                return styles.pendiente;
            case 'Solventado':
                return styles.resuelto;
            case 'En progreso':
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
                {data.map((item, index) => (
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
                            <button onClick={() => showDetails(item.id)} className={styles.buttonDetails}><FaEye/>
                            </button>
                            {item.status === 'Pendiente' &&
                                <button onClick={() => editRequest(item.id)} className={styles.buttonEdit}><FaPencil/>
                                </button>}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
