import styles from "./reportListStyles.module.scss";
import React from "react";

export default function ReportList({data}) {
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}