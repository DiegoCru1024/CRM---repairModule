import React, {useState} from "react";
import SideBar from "../sideBarComponent/sideBar";
import styles from "./repairRequestPlatform.module.scss";
import axios from "axios";
import Textinput from "../../ui/Textinput";
import Select from "../../ui/Select";

const RepairRequestPlatform = () => {
    const [clientData, setClientData] = useState({
        firstName: '',
        lastName: '',
        bornDate: '',
        email: ''
    })
    const [orderData, setOrderData] = useState([])
    const [requestData, setRequestData] = useState({})

    const searchClient = async () => {
        try {
            const url = `https://clientemodulocrm.onrender.com/buscarPorDNI/${requestData.clientId}`
            const response = await axios.get(url)
            setClientData({
                firstName: response.data[0].nombre,
                lastName: response.data[0].apellido,
                bornDate: response.data[0].fechanac,
                email: response.data[0].correo
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }

        if (clientData.firstName !== '') {
            try {
                const url = 'URL Ventas'
                const response = await axios.get(url)
                setOrderData(response.data)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const sendRequest = async (e) => {
        e.preventDefault()
        try {
            const url = 'https://reapir-module-crm-230927095955.azurewebsites.net/api/RepairRequest'
            const response = await axios.post(url, requestData)
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
        }));

        console.log(requestData)
    };


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
                                    <button onClick={searchClient}>Buscar</button>
                                </div>
                            </div>
                            <div className={styles.userDataInput}>
                                <Textinput name={'nombres'} label={'Nombres:'} value={clientData.firstName}/>
                                <Textinput name={'apellidos'} label={'Apellidos:'} value={clientData.lastName}/>
                                <Textinput name={'fechanac'} label={'Fecha de Nacimiento:'}
                                           value={clientData.bornDate}/>
                                <Textinput name={'correo'} label={'Correo de Contacto:'} value={clientData.email}/>
                            </div>
                        </div>
                        <div>
                            <h2>Datos de Venta</h2>
                            <div>
                                <Select name={'venta'} options={orderData} label={'Venta Asociada:'}/>
                            </div>
                            <div className={styles.userDataInput}>
                                <Textinput name={'equipo'} label={'Equipo:'}/>
                                <Textinput name={'garantia'} label={'Garantía:'}/>
                                <Textinput name={'fecha'} label={'Fecha de Compra:'}/>
                                <Textinput name={'precio'} label={'Precio de Equipo:'}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Información de Solicitud</h2>
                        <div className={styles.userDataInput}>
                            <div>
                                <label className={'form-label'}>Estado del Dispositivo:</label>
                                <input className={'form-control'} name={'deviceStatus'} onChange={handleChange}/>
                            </div>
                            <div>
                                <label className={'form-label'}>Correo Alternativo:</label>
                                <input className={'form-control'} name={'contactEmailInfo'} onChange={handleChange}/>
                            </div>
                            <div>
                                <label className={'form-label'}>Descripción:</label>
                                <textarea className={'form-control'} name={'description'} onChange={handleChange}/>
                            </div>
                            <div>
                                <label className={'form-label'}>Motivo:</label>
                                <textarea className={'form-control'} name={'motive'} maxLength={250}
                                          onChange={handleChange}/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RepairRequestPlatform;
