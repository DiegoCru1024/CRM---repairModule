import SideBar from "../sideBarComponent/sideBar";
import ReportList from "./reportList/reportList";
import styles from './reportStyles.module.scss'
import axiosJWT from '../../axios/axiosInstance';
import {useEffect, useState} from "react";

export default function ReportComponent() {
    const [reportData, setReportData] = useState([])
    const [filters, setFilters] = useState({
        status: '',
        clientId: '',
        fromDate: '',
        toDate: '',
        limit: ''
    })

    const getData = async () => {
        const url = `/api/RepairRequest/Search?status=${filters.status}&clientId=${filters.clientId}&fromDate=${filters.fromDate}&toDate=${filters.toDate}&limit=${filters.limit}`
        const response = await axiosJWT.get(url)
        setReportData(response.data)
    }

    const downloadExcel = async () => {
        const url = `/api/RepairRequest/DownloadAsExcel?status=${filters.status}&clientId=${filters.clientId}&fromDate=${filters.fromDate}&toDate=${filters.toDate}&limit=${filters.limit}`
        axiosJWT.get(url, {responseType: 'blob'})
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'reporte.xlsx');
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                console.error('Error al descargar el archivo Excel', error);
            });
    }

    useEffect(() => {
        getData().then(() => {
        })
    }, [filters])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFilters({...filters, [name]: value});
    };

    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <div className={styles.repairRequestContainer}>
                <h2>Reporte de Solicitudes</h2>
                <div className={styles.filterContainer}>
                    <div>
                        <label className={'form-label'}>Estado:</label>
                        <input
                            type="text"
                            name="status"
                            value={filters.status}
                            onChange={handleInputChange}
                            className={'form-control'}
                        />
                    </div>
                    <div>
                        <label className={'form-label'}>Cliente:</label>
                        <input
                            type="number"
                            name="clientId"
                            value={filters.clientId}
                            onChange={handleInputChange}
                            className={'form-control'}
                        />
                    </div>
                    <div>
                        <label className={'form-label'}>Fecha Inicio</label>
                        <input
                            type="date"
                            name="fromDate"
                            value={filters.fromDate}
                            onChange={handleInputChange}
                            className={'form-control'}
                        />
                    </div>
                    <div>
                        <label className={'form-label'}>Fecha Fin</label>
                        <input
                            type="date"
                            name="toDate"
                            value={filters.toDate}
                            onChange={handleInputChange}
                            className={'form-control'}
                        />
                    </div>
                    <div>
                        <label className={'form-label'}>Límite de Filas:</label>
                        <input
                            type="number"
                            name="limit"
                            value={filters.limit}
                            onChange={handleInputChange}
                            className={'form-control'}
                        />
                    </div>
                </div>
                <ReportList data={reportData}/>
                <button type={"button"} onClick={downloadExcel} className={styles.excelButton}>Descargar Excel</button>
            </div>
        </div>
    )
}