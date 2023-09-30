import SideBar from "../sideBarComponent/sideBar";
import styles from './dashboardPage.module.css'

export default function DashboardPage() {
    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <div className={styles.dashboardContainer}>
                <h1>DashBoard</h1>
            </div>
        </div>
    )
}