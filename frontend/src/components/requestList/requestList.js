import React, {useEffect, useState} from 'react';
import SideBar from '../sideBarComponent/sideBar';
import styles from './requestList.module.scss';
import axios from '../../axios/axiosInstance'
import ListComponent from "./listComponent/listComponent";

export default function RequestList() {
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
            <div className={styles.requestListContainer}>
                <ListComponent data={requestArray}/>
            </div>
        </div>
    );
}
