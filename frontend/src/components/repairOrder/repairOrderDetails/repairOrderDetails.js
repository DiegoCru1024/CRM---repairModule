import SideBar from "../../sideBarComponent/sideBar";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosJWT from "../../../axios/axiosInstance";
import styles from "../repairOrder.module.scss";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function RepairOrderDetails() {
    const {guid} = useParams()
    const navigate = useNavigate()
    const [repairOrderData, setRepairOrderData] = useState({})

    const getData = async () => {
        try {
            const url = `/api/RepairOrder/${guid}?includeDetails=true`
            const response = await axiosJWT.get(url)
            setRepairOrderData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

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

    useEffect(() => {
        getData().then(() => {
        })
    }, [])

    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <form className={styles.repairOrderContainer} id={'pdfContent'}>
                <h1>Detalles de Solicitud</h1>
                <div>
                    <h2>Información de Solicitud</h2>
                    <div className={styles.userDataInput}>
                        <div>
                            <label className={'form-label'}>Cliente:</label>
                            <input className={'form-control'}
                                   value={repairOrderData.repairRequest ? repairOrderData.repairRequest.clientId : ''}
                                   readOnly={true}/>
                        </div>
                        <div>
                            <label className={'form-label'}>Correo Alternativo:</label>
                            <input className={'form-control'}
                                   value={repairOrderData.repairRequest ? repairOrderData.repairRequest.contactEmailInfo : ''}
                                   readOnly={true}/>
                        </div>
                        <div>
                            <label className={'form-label'}>Venta:</label>
                            <input className={'form-control'}
                                   value={repairOrderData.repairRequest ? repairOrderData.repairRequest.purchaseOrderId : ''}
                                   readOnly={true}/>
                        </div>
                        <div>
                            <label className={'form-label'}>Producto:</label>
                            <input className={'form-control'}
                                   value={repairOrderData.repairRequest ? repairOrderData.repairRequest.productId : ''}
                                   readOnly={true}/>
                        </div>
                        <div>
                            <label className={'form-label'}>Descripcion:</label>
                            <input className={'form-control'}
                                   value={repairOrderData.repairRequest ? repairOrderData.repairRequest.description : ''}
                                   readOnly={true}/>
                        </div>
                        <div>
                            <label className={'form-label'}>Motivo:</label>
                            <input className={'form-control'}
                                   value={repairOrderData.repairRequest ? repairOrderData.repairRequest.motive : ''}
                                   readOnly={true}/>
                        </div>
                        <div>
                            <label className={'form-label'}>Estado de Dispositivo:</label>
                            <input className={'form-control'}
                                   value={repairOrderData.repairRequest ? repairOrderData.repairRequest.deviceStatus : ''}
                                   readOnly={true}/>
                        </div>
                        <div>
                            <label className={'form-label'}>Garantía:</label>
                            <input className={'form-control'}
                                   value={repairOrderData.repairRequest ? repairOrderData.repairRequest.warrantyId : ''}
                                   readOnly={true}/>
                        </div>
                    </div>

                    <h2>Información de Diagnóstico</h2>
                    <div className={styles.userDataInput}>
                        <div>
                            <label className={'form-label'}>Fecha de Creación:</label>
                            <input className={'form-control'}
                                   value={repairOrderData ? repairOrderData.createdAt : ''}
                                   readOnly={true}/>
                        </div>
                        <div>
                            <label className={'form-label'}>Fecha Límite:</label>
                            <input className={'form-control'}
                                   value={repairOrderData ? repairOrderData.deadLine : ''}
                                   readOnly={true}/>
                        </div>
                        <div>
                            <label className={'form-label'}>Elegible a Garantía:</label>
                            <input className={'form-control'}
                                   value={repairOrderData ? repairOrderData.createdAt : ''}
                                   readOnly={true}/>
                        </div>
                        <div>
                            <label className={'form-label'}>Descuento:</label>
                            <input className={'form-control'}
                                   value={repairOrderData ? repairOrderData.discount : ''}
                                   readOnly={true}/>
                        </div>
                        <div>
                            <label className={'form-label'}>Subtotal:</label>
                            <input className={'form-control'}
                                   value={repairOrderData ? repairOrderData.subTotal : ''}
                                   readOnly={true}/>
                        </div>
                        <div>
                            <label className={'form-label'}>Total:</label>
                            <input className={'form-control'}
                                   value={repairOrderData ? repairOrderData.total : ''}
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
    )
}