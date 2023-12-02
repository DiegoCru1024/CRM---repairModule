import styles from "../repairRequest.module.scss";
import SideBar from "../../sideBarComponent/sideBar";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import RepairDataFacade from "../repairDataFacade";
import axiosJWT from '../../../axios/axiosInstance';

export default function RequestUpdate() {
    const {guid} = useParams()
    const [clientData, setClientData] = useState({})
    const [orderData, setOrderData] = useState({})
    const [requestData, setRequestData] = useState({
        clientId: '',
        purchaseOrderId: '',
        productId: '',
        motive: '',
        description: '',
        deviceStatus: '',
        contactEmailInfo: ''
    })
    const repairDataFacade = new RepairDataFacade()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target
        setRequestData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    useEffect(() => {
        const fetchData = async () => {
            setRequestData(await repairDataFacade.getRequestData(guid))
        }

        fetchData().then(() => {
        })
    }, [guid])

    useEffect(() => {
        const fetchData = async () => {
            setClientData(await repairDataFacade.getClientData(requestData.clientId))
            setOrderData(await repairDataFacade.getOrderData(requestData.purchaseOrderId))
        }

        if (requestData.clientId && requestData.purchaseOrderId) {
            fetchData().then(() => {
            })
        }
    }, [requestData]);

    const updateRequest = async (e) => {
        e.preventDefault()

        const updateData = {
            motive: requestData.motive,
            description: requestData.description,
            deviceStatus: requestData.deviceStatus,
            contactEmailInfo: requestData.contactEmailInfo
        }

        try {
            const url = `/api/RepairRequest/${guid}`
            const response = await axiosJWT.put(url, updateData)
            console.log(response)
            navigate('/requestList')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <div className={styles.repairRequestContainer}>
                <form onSubmit={updateRequest}>
                    <h1>Edición de Solicitud</h1>
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
                    <div>
                        <h2>Información de Solicitud</h2>
                        <div className={styles.userDataInput}>
                            <div>
                                <label className={'form-label'}>Estado del Dispositivo:</label>
                                <input className={'form-control'} name={'deviceStatus'} onChange={handleChange}
                                       type={'number'} min={1} max={10} value={requestData.deviceStatus}
                                       placeholder={'Ingrese el estado del dispositivo (1-10)'}/>
                            </div>
                            <div>
                                <label className={'form-label'}>Correo Alternativo:</label>
                                <input className={'form-control'} name={'contactEmailInfo'} onChange={handleChange}
                                       value={requestData.contactEmailInfo}
                                       placeholder={'Ingrese un correo de contacto alternativo'}/>
                            </div>
                            <div>
                                <label className={'form-label'}>Descripción:</label>
                                <textarea className={'form-control'} name={'description'} onChange={handleChange}
                                          value={requestData.description} placeholder={'Descripción del problema'}/>
                            </div>
                            <div>
                                <label className={'form-label'}>Motivo:</label>
                                <textarea className={'form-control'} name={'motive'} maxLength={250}
                                          onChange={handleChange} value={requestData.motive}
                                          placeholder={'Motivo del problema'}/>
                            </div>
                        </div>
                    </div>
                    <button type={'submit'} className={styles.sendButton}>Enviar</button>
                </form>
            </div>
        </div>
    )
}