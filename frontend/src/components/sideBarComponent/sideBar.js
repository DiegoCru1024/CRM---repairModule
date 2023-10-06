import styles from './sideBar.module.css'
import {HiCalculator, HiChip, HiClipboardList, HiHome, HiInformationCircle} from "react-icons/hi";
import {HiUserCircle} from "react-icons/hi2";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function SideBar() {
    const userData = useSelector((state) => state.userData)
    const handleLogOut = () => {
        console.log('Log Out...')
    }

    return (
        <div className={styles.sideBarContainer}>
            <div className={styles.userContainer}>
                <HiUserCircle style={{fontSize: '50px'}}/>
                <div className={styles.userInfo}>
                    <h3>{userData.name}</h3>
                    <p>Rol: {userData.role}</p>
                </div>
            </div>

            <ul className={styles.navBar}>
                <li><Link to={'/dashboard'}>
                    <HiHome className={styles.navBarIcon}/> Dashboard</Link>
                </li>

                <li><Link to={'/requestList'}>
                    <HiClipboardList className={styles.navBarIcon}/> Lista de Solicitudes</Link>
                </li>

                <li><Link to={'/platformRequest'}>
                    <HiInformationCircle className={styles.navBarIcon}/> Solucitud por Plataforma</Link>
                </li>

                <li><Link to={'/technicalForm'}>
                    <HiChip className={styles.navBarIcon}/> Solicitud de Asistencia Técnica</Link>
                </li>

                <li><Link to={'/quoteForm'}>
                    <HiCalculator className={styles.navBarIcon}/> Cotización</Link>
                </li>
            </ul>

            <button type={"button"} onClick={handleLogOut} className={styles.logOut}>Cerrar Sesión</button>
        </div>
    )
}