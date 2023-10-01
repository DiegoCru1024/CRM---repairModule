import SideBar from '../sideBarComponent/sideBar';
import styles from './requestList.module.css'


export default function RequestList(){
    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <div className={styles.requestListContainer}>
                <h1>Este es el listRequest</h1>
            </div>
        </div>
    )
}


