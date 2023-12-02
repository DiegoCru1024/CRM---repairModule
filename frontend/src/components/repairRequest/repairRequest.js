import React, {useEffect, useState} from "react"
import SideBar from "../sideBarComponent/sideBar"
import styles from "./repairRequest.module.scss"
import axiosJWT from "../../axios/axiosInstance"
import axios from 'axios'
import TextInput from "../../ui/TextInput"
import MessageMediator from "../../mediators/messageMediator"
import {useNavigate} from "react-router-dom";

const RepairRequest = () => {
    const navigate = useNavigate()
    const messageMediator = new MessageMediator()
    const [requestData, setRequestData] = useState({
        clientId: '',
        purchaseOrderId: '',
        productId: '',
        motive: '',
        description: '',
        deviceStatus: '',
        contactEmailInfo: ''
    })
    const [clientData, setClientData] = useState({
        firstName: '',
        lastName: '',
        bornDate: '',
        email: ''
    })
    const [orderData, setOrderData] = useState([])
    const [orderDetailsData, setOrderDetailsData] = useState([{}])

    const searchClient = async () => {
        if (!requestData.clientId) {
            setClientData({
                firstName: '',
                lastName: '',
                bornDate: '',
                email: ''
            })
            setOrderData([])
            setOrderDetailsData([])
            messageMediator.showMessage('Ingrese un DNI para continuar...', 'error')
            return
        }

        try {
            const url = `https://clientemodulocrm.onrender.com/clientes/buscarPorDNI/${requestData.clientId}`
            const clientResponse = await axios.get(url)

            const {fechanac, correo, error, apellido} = clientResponse.data
            if (error) {
                setClientData({
                    firstName: '',
                    lastName: '',
                    bornDate: '',
                    email: ''
                })
                setOrderData([])
                setOrderDetailsData([])
                messageMediator.showMessage('No se ha encontrado ningún cliente...', 'question')
                return
            }

            const {nombre} = clientResponse.data
            setClientData({
                firstName: nombre,
                lastName: apellido,
                bornDate: fechanac,
                email: correo
            })

            await searchOrder()
        } catch (error) {
            console.log(error)
        }
    }

    const searchOrder = async () => {
        try {
            const url = `https://modulo-ventas.onrender.com/getselldni/${requestData.clientId}`
            const orderResponse = await axios.get(url)

            if (!orderResponse.data) {
                setOrderData([])
                return
            }

            setOrderData(orderResponse.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSelectChange = async (e) => {
        const {name, value} = e.target

        if (value === 'invalid') {
            messageMediator.showMessage('Debes seleccionar un elemento...', 'error')
            setOrderDetailsData([])


            return
        }

        setRequestData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    useEffect(() => {
        const fetchDetailsData = async () => {
            console.log(requestData.purchaseOrderId)
            try {
                const url = `https://modulo-ventas.onrender.com/getselldetails/${requestData.purchaseOrderId}`;
                const detailsResponse = await axios.get(url);
                console.log(detailsResponse.data)
                setOrderDetailsData(detailsResponse.data[0])
                setRequestData((prevState) => ({
                    ...prevState,
                    'productId': detailsResponse.data[0].id_producto
                }))
            } catch (error) {
                console.log(error);
            }
        };

        if (requestData.purchaseOrderId) {
            fetchDetailsData().then(() => {
                console.log('Detalle de venta recibido...')
            });
        }
    }, [requestData.purchaseOrderId]);

    const sendRequest = async (e) => {
        e.preventDefault()
        try {
            const url = '/api/RepairRequest'
            const response = await axiosJWT.post(url, requestData)
            await messageMediator.showMessage('Se ha registrado la solicitud...', 'success')
            navigate('/dashboard')
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setRequestData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <div className={styles.repairRequestContainer}>
                <form onSubmit={sendRequest}>
                    <h1>Generar Solicitud</h1>
                    <div className={styles.mainDataContainer}>
                        <div>
                            <h2>Datos del Cliente</h2>
                            <div className={styles.searchClientContainer}>
                                <label className={'form-label'}>DNI Cliente:</label>
                                <div>
                                    <input type={'text'} name={'clientId'} className={'form-control'}
                                           onChange={handleChange}/>
                                    <button type={'button'} onClick={searchClient}>Buscar</button>
                                </div>
                            </div>
                            <div className={styles.userDataInput}>
                                <TextInput name={'nombres'} label={'Nombres:'} value={clientData.firstName}/>
                                <TextInput name={'apellidos'} label={'Apellidos:'} value={clientData.lastName}/>
                                <TextInput name={'fechanac'} label={'Fecha de Nacimiento:'}
                                           value={clientData.bornDate}/>
                                <TextInput name={'correo'} label={'Correo de Contacto:'} value={clientData.email}/>
                            </div>
                        </div>
                        <div>
                            <h2>Datos de Venta</h2>
                            <div>
                                <label className={'form-label'}>Venta Asociada:</label>
                                <select name={'purchaseOrderId'} className={'form-control'}
                                        onChange={handleSelectChange}>
                                    {orderData.length === 0 ? (
                                        <option value={'invalid'}>No se han encontrado ventas...</option>
                                    ) : (
                                        <>
                                            <option value={'invalid'}>Seleccione una venta...</option>
                                            {orderData.map((order) => (
                                                <option key={order.id_venta}
                                                        value={order.id_venta}>{order.id_venta}</option>
                                            ))}
                                        </>
                                    )}
                                </select>
                            </div>
                            <div className={styles.userDataInput}>
                                <TextInput name={'producto'} label={'Producto:'}
                                           value={orderDetailsData.id_producto || ''}/>
                                <TextInput name={'precio'} label={'Precio de Equipo:'}
                                           value={orderDetailsData.coste_total || ''}/>
                                <TextInput name={'garantia'} label={'Garantía:'}
                                           value={orderDetailsData.id_garantia || ''}/>
                                <TextInput name={'fecha'} label={'Tiempo de Garantía:'}
                                           value={orderDetailsData.tipo || ''}/>
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

export default RepairRequest