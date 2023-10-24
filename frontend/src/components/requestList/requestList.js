import SideBar from "../sideBarComponent/sideBar";
import styles from './requestList.module.css'

export default function RequestList() {
    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <div className={styles.listContainer}>
                <h1>Lista de Solicitudes</h1>
            </div>
        </div>
    )
}