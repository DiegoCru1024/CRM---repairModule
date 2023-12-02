import SideBar from "../../sideBarComponent/sideBar";
import styles from "./repairOrderListStyles.module.scss";
import React, {useEffect, useState} from "react";
import axiosJWT from '../../../axios/axiosInstance'
import {FaEye} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {FaCheckCircle, FaExchangeAlt} from "react-icons/fa";
import Swal from "sweetalert2";

export default function RepairOrderList() {
    const navigate = useNavigate()
    const [repairDataArray, setRepairDataArray] = useState([])

    const getRepairData = async () => {
        try {
            const url = '/api/RepairOrder/All'
            const response = await axiosJWT.get(url)
            setRepairDataArray(response.data)
        } catch (error) {
            console.log(error)
        }
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

    useEffect(() => {
        getRepairData().then(() => {
        })
    }, [])

    const viewDetails = (guid) => {
        navigate(`/repairOrder/view/${guid}`)
    }

    const handleModal = async (guid) => {
        const result = await Swal.fire({
            title: '¿El cliente aceptó el diagnóstico?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
        });

        if (result.isConfirmed) {
            const url = `/api/RepairOrder/${guid}/Confirmation?nextStep=true`
            await axiosJWT.put(url)
        } else {
            const url = `/api/RepairOrder/${guid}/Confirmation?nextStep=false`
            await axiosJWT.put(url)
        }

        window.location.reload()
    }

    const hanldeConfirmModal = async (guid) => {
        const result = await Swal.fire({
            title: '¿Seguro que desea finalizar esta reparación?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
        });

        if (result.isConfirmed) {
            const url = `/api/RepairOrder/${guid}/Ready`
            await axiosJWT.put(url)
            window.location.reload()
        }
    }

    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <div className={styles.repairListContainer}>
                <h1>Lista de Diagnósticos</h1>
                <div className={styles.tableContainer}>
                    <table>
                        <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>ID Diagnóstico</th>
                            <th>Fecha de Creación</th>
                            <th>Fecha Límite</th>
                            <th>Garantía Elegible</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {repairDataArray

                            .map((item, index) => (
                                <tr key={index}>
                                    <td>{item.repairRequest.clientId}</td>
                                    <td>{item.id}</td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.deadLine}</td>
                                    <td>{item.warrantyEligible === true ? 'Sí' : 'No'}</td>
                                    <td>
                                        <p className={`${styles.estadoButton} ${getStatusStyle(item.repairRequest.status)}`}>
                                            {item.repairRequest.status}
                                        </p>
                                    </td>
                                    <td className={styles.menuAcciones}>
                                        <button className={styles.buttonDetails} onClick={() => viewDetails(item.id)}>
                                            <FaEye/></button>
                                        {item.repairRequest.status === 'Notificado' &&
                                            <button className={styles.buttonEdit} onClick={() => handleModal(item.id)}>
                                                <FaExchangeAlt/></button>}
                                        {item.repairRequest.status === 'En progreso' &&
                                            <button className={styles.buttonConfirm}
                                                    onClick={() => hanldeConfirmModal(item.id)}>
                                                <FaCheckCircle/></button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}