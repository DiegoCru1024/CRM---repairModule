import styles from "../repairRequest.module.scss";
import SideBar from "../../sideBarComponent/sideBar";

import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import RepairDataFacade from "../repairDataFacade";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function RequestDetails() {
    const {guid} = useParams()
    const [clientData, setClientData] = useState({})
    const [orderData, setOrderData] = useState({})
    const [requestData, setRequestData] = useState({})

    const navigate = useNavigate()
    const repairDataFacade = new RepairDataFacade()

    useEffect(() => {
        const fetchData = async () => {
            setClientData(await repairDataFacade.getClientData(requestData.clientId))
            setOrderData(await repairDataFacade.getOrderData(requestData.purchaseOrderId))
        }

        if (requestData.clientId && requestData.purchaseOrderId) {
            fetchData().then(() => {
            })
        }
    }, [requestData])

    useEffect(() => {
        const fetchData = async () => {
            setRequestData(await repairDataFacade.getRequestData(guid))
        }

        fetchData().then(() => {
        })
    }, [guid])

    const savePDF = () => {
        const input = document.getElementById('pdfContent');
        input.style.padding = '25px'

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgWidth = 210;
                const imgHeight = (canvas.height * imgWidth) / canvas.width; // Ajuste de altura para mantener la relación de aspecto
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save(`${guid}.pdf`);
            });
    }

    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <div className={styles.repairRequestContainer}>
                <form id={'pdfContent'}>
                    <h1>Detalles de Solicitud</h1>
                    <div className={styles.mainDataContainer}>
                        <div>
                            <h2>Datos del Cliente</h2>
                            <div className={styles.searchClientContainer}>
                                <label className={'form-label'}>DNI Cliente:</label>
                                <input name={'clientId'} className={'form-control'}
                                       value={requestData.clientId ? requestData.clientId : ''}
                                       readOnly/>
                            </div>
                            <div className={styles.userDataInput}>
                                <div>
                                    <label className={'form-label'}>Nombres:</label>
                                    <input className={'form-control'} value={clientData.nombre ? clientData.nombre : ''}
                                           readOnly={true}/>
                                </div>
                                <div>
                                    <label className={'form-label'}>Apellidos:</label>
                                    <input className={'form-control'}
                                           value={clientData.apellido ? clientData.apellido : ''}
                                           readOnly={true}/>
                                </div>
                                <div>
                                    <label className={'form-label'}>Fecha de Nacimiento:</label>
                                    <input className={'form-control'}
                                           value={clientData.fechanac ? clientData.fechanac : ''}
                                           readOnly={true}/>
                                </div>
                                <div>
                                    <label className={'form-label'}>Correo de Contacto:</label>
                                    <input className={'form-control'} value={clientData.correo ? clientData.correo : ''}
                                           readOnly={true}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2>Datos de Venta</h2>
                            <div>
                                <label className={'form-label'}>Venta Asociada:</label>
                                <input name={'orderId'} className={'form-control'}
                                       value={requestData.purchaseOrderId ? requestData.purchaseOrderId : ''}
                                       readOnly/>
                            </div>
                            <div className={styles.userDataInput}>
                                <div>
                                    <label className={'form-label'}>Venta Asociada:</label>
                                    <input name={'orderId'} className={'form-control'}
                                           value={requestData.purchaseOrderId ? requestData.purchaseOrderId : ''}
                                           readOnly/>
                                </div>
                                <div className={styles.userDataInput}>
                                    <div>
                                        <label className={'form-label'}>Producto:</label>
                                        <input className={'form-control'}
                                               value={orderData.id_producto ? orderData.id_producto : ''}
                                               readOnly={true}/>
                                    </div>
                                    <div>
                                        <label className={'form-label'}>Precio de Equipo:</label>
                                        <input className={'form-control'}
                                               value={orderData.coste_total ? orderData.coste_total : ''}
                                               readOnly={true}/>
                                    </div>
                                    <div>
                                        <label className={'form-label'}>Garantía:</label>
                                        <input className={'form-control'}
                                               value={orderData.id_garantia ? orderData.id_garantia : ''}
                                               readOnly={true}/>
                                    </div>
                                    <div>
                                        <label className={'form-label'}>Tipo de Producto:</label>
                                        <input className={'form-control'} value={orderData.tipo ? orderData.tipo : ''}
                                               readOnly={true}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Información de Solicitud</h2>
                        <div className={styles.userDataInput}>
                            <div>
                                <label className={'form-label'}>Estado del Dispositivo:</label>
                                <input className={'form-control'}
                                       value={requestData.deviceStatus ? requestData.deviceStatus : ''}
                                       readOnly={true}/>
                            </div>
                            <div>
                                <label className={'form-label'}>Correo alternativo:</label>
                                <input className={'form-control'}
                                       value={requestData.contactEmailInfo ? requestData.contactEmailInfo : ''}
                                       readOnly={true}/>
                            </div>
                            <div>
                                <label className={'form-label'}>Descripción del problema:</label>
                                <input className={'form-control'}
                                       value={requestData.description ? requestData.description : ''}
                                       readOnly={true}/>
                            </div>
                            <div>
                                <label className={'form-label'}>Motivo:</label>
                                <input className={'form-control'} value={requestData.motive ? requestData.motive : ''}
                                       readOnly={true}/>
                            </div>
                        </div>
                    </div>
                    <button type={'button'} className={styles.cancelButton} onClick={() => {
                        navigate(-1)
                    }}>Volver
                    </button>
                    <button type={"button"} onClick={savePDF} className={styles.pdfButton}>Guardar PDF</button>
                </form>
            </div>
        </div>
    )
}