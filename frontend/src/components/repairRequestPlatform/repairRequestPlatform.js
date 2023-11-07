import React, {useState} from "react";
import SideBar from "../sideBarComponent/sideBar";
import styles from "./repairRequestPlatform.module.css";
import axios from "axios";
import Textinput from "../../ui/Textinput";
import Select from "../../ui/Select";

const RepairRequestPlatform = () => {
    const [clientData, setClientData] = useState({
        firstName: 'Test',
        lastName: 'Apellido'
    })
    const [orderData, setOrderData] = useState([])
    const [requestData, setRequestData] = useState({})

    const searchClient = async () => {
        try {
            const url = 'URL CLiente'
            const response = await axios.get(url)
            setClientData(response.data)
            console.log(response)
        } catch (error) {
            console.log(error)
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
        setRequestData(...requestData,
        )
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
                            <div>
                                <Textinput name={'dni'} label={'DNI Cliente:'} readOnly={false}
                                           onChange={handleChange}/>
                            </div>
                            <div className={styles.userDataInput}>
                                <Textinput name={'nombres'} label={'Nombres:'} value={clientData.firstName}/>
                                <Textinput name={'apellidos'} label={'Apellidos:'} value={clientData.lastName}/>
                                <Textinput name={'telefono'} label={'Telefono de Contacto:'} value={clientData.phone}/>
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
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RepairRequestPlatform;
