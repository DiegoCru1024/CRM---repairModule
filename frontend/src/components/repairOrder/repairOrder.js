import SideBar from "../sideBarComponent/sideBar";
import styles from './repairOrder.module.scss'
import {useEffect, useState} from "react";
import axios from "../../axios/axiosInstance";
import ListOrderComponent from "./listOrderComponent/listOrderComponent";

export default function RepairOrder() {
    const [requestArray, setRequestArray] = useState([])

    const getRequests = async () => {
        const url = '/api/RepairRequest/All'
        const response = await axios.get(url)
        setRequestArray(response.data)
    }

    useEffect(() => {
        getRequests().then(() => {
        })
    }, [])

    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <div className={styles.repairOrderContainer}>
                <h1>Lista de Solicitudes por Atender</h1>
                <ListOrderComponent data={requestArray}/>
            </div>
        </div>
    )
}