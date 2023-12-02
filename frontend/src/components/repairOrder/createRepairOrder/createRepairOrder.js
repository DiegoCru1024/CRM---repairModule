import SideBar from "../../sideBarComponent/sideBar";
import styles from './createOrder.module.scss'
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axiosJWT from '../../../axios/axiosInstance'

export default function CreateRepairOrder() {
    const {guid} = useParams();
    const navigate = useNavigate()
    const [componentCounter, setComponentCounter] = useState(1);
    const [spareArray, setSpareSrray] = useState([])
    const [requestData, setRequestData] = useState({})
    const [diagnosesData, setDiagnosesData] = useState({
        description: '',
        offeredService: '',
        note: '',
        sparePartAssignments: []
    })
    const [repairOrderData, setRepairOrderData] = useState({
        diagnoses: [
            diagnosesData
        ],
        deadLine: ''
    })

    const renderComponents = () => {
        const componentsArray = [];
        for (let i = 0; i < componentCounter; i++) {
            componentsArray.push(
                <div key={i} className={styles.spareContainer}>
                    <div>
                        <label className={'form-label'}>Componente:</label>
                        <select
                            className={'form-control'}
                            onChange={(e) => handleComponentChange(e, i)}
                            name="sparePartId"
                            value={diagnosesData.sparePartAssignments[i]?.sparePartId || -1}
                        >
                            <option value={-1}>-- Seleccione un componente --</option>
                            {spareArray.map((spare) => (
                                <option value={spare.id} key={spare.id}>{spare.name}</option>
                            ))}
                        </select>

                    </div>
                    <div>
                        <label className={'form-label'}>Cantidad:</label>
                        <input
                            className={'form-control'}
                            type={"number"}
                            name={'quantity'}
                            onChange={(e) => handleComponentChange(e, i)}
                            value={diagnosesData.sparePartAssignments[i]?.quantity || ''}
                        />
                    </div>
                </div>
            );
        }
        return componentsArray;
    };

    useEffect(() => {
        const fetchSpare = async () => {
            const url = '/api/RepairOrder/SpareParts'
            const response = await axiosJWT.get(url)
            setSpareSrray(response.data)
        }

        const getRequestData = async () => {
            const url = '/api/RepairOrder/All'
            const response = await axiosJWT.get(url)
            const repairData = response.data.filter(item => item.repairRequest.id === guid)[0]
            setRequestData(repairData)
        }

        fetchSpare().then(() => {
        })

        getRequestData().then(() => {
        })
    }, [guid])

    useEffect(() => {
        setRepairOrderData(prevState => ({
            ...prevState,
            diagnoses: [diagnosesData]
        }))
    }, [diagnosesData])

    const sendRepairOrder = async (e) => {
        e.preventDefault()

        try {
            const url = `/api/RepairOrder/${requestData.id}/Diagnose`
            const response = await axiosJWT.put(url, repairOrderData)
            console.log(response)

            navigate('/repairOrder')
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setDiagnosesData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleDeadlineChange = (e) => {
        const {name, value} = e.target
        setRepairOrderData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleComponentChange = (e, index) => {
        const {name, value} = e.target;

        const updatedDiagnosesData = {...diagnosesData};
        const currentComponent = updatedDiagnosesData.sparePartAssignments[index] || {};

        updatedDiagnosesData.sparePartAssignments[index] = {
            ...currentComponent,
            [name]: value,
        };

        setDiagnosesData(updatedDiagnosesData);
    };


    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <div className={styles.repairOrderContainer}>
                <form onSubmit={sendRepairOrder}>
                    <h1>Diagnóstico de Solicitud</h1>

                    <div className={styles.diagnosisContainer}>
                        <h2>Información de Solicitud</h2>
                        <div className={styles.userDataInput}>
                            <div>
                                <label className={'form-label'}>Estado del Dispositivo:</label>
                                <input className={'form-control'}
                                       value={requestData.repairRequest ? requestData.repairRequest.deviceStatus : ''}
                                       readOnly={true}/>
                            </div>
                            <div>
                                <label className={'form-label'}>Correo alternativo:</label>
                                <input className={'form-control'}
                                       value={requestData.repairRequest ? requestData.repairRequest.contactEmailInfo : ''}
                                       readOnly={true}/>
                            </div>
                            <div>
                                <label className={'form-label'}>Descripción:</label>
                                <textarea className={'form-control'}
                                          value={requestData.repairRequest ? requestData.repairRequest.description : ''}
                                          readOnly={true}/>
                            </div>
                            <div>
                                <label className={'form-label'}>Motivo:</label>
                                <textarea className={'form-control'}
                                          value={requestData.repairRequest ? requestData.repairRequest.motive : ''}
                                          readOnly={true}/>
                            </div>
                        </div>

                        <br/><br/>
                        <h2>Información de Diagnóstico</h2>
                        <div className={styles.userDataInput}>
                            <div>
                                <label className={'form-label'}>Descripcion:</label>
                                <input className={'form-control'} name={'description'} onChange={handleChange}
                                       value={diagnosesData.description}/>
                            </div>
                            <div>
                                <label className={'form-label'}>Servicio ofrecido:</label>
                                <input className={'form-control'} name={'offeredService'} onChange={handleChange}
                                       value={diagnosesData.offeredService}/>
                            </div>
                            <div>
                                <label className={'form-label'}>Nota adicional:</label>
                                <input className={'form-control'} name={'note'} onChange={handleChange}
                                       value={diagnosesData.note}/>
                            </div>
                            <div>
                                <label className={'form-label'}>Fecha Límite:</label>
                                <input className={'form-control'} name={'deadLine'} onChange={handleDeadlineChange}
                                       value={repairOrderData.deadLine} type={"date"}/>
                            </div>
                        </div>

                        <div>
                            <h3>Componentes:</h3>

                            {renderComponents()}

                            <button type={"button"} className={styles.componentButton}
                                    onClick={() => setComponentCounter(componentCounter + 1)}>Añadir
                            </button>
                            <button type={"button"} className={styles.componentButton}
                                    onClick={() => setComponentCounter(componentCounter - 1)}>Quitar
                            </button>
                        </div>
                    </div>
                    <button type={"submit"} className={styles.sendButton}>Enviar</button>
                </form>
            </div>
        </div>
    )
}
