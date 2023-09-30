import styles from './loginPage.module.css'
import logo from '../../assets/logo.jpg'
import vector from '../../assets/backgroundVector.png'
import {BiUserCircle, BiLock} from 'react-icons/bi'

const iconStyle = {color: "#09be7c", fontSize: 30, marginRight: 5}

export default function LoginPage() {

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Login") 
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.infoContainer}>
                <img src={vector} alt={"vector"}/>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.loginWrapper}>
                    <form className={styles.loginForm} onSubmit={handleSubmit}>
                        <img src={logo} alt={"logo"}/>
                        <h1>CRM Módulo de Reparaciones</h1>

                        <div className={styles.labelWrapper}>
                            <BiUserCircle style={iconStyle}/>
                            <label htmlFor={'userInput'}>Usuario:</label>
                        </div>
                        <input type={"text"} id={'userInput'} placeholder={'Ingrese su usuario...'}/>

                        <div className={styles.labelWrapper}>
                            <BiLock style={iconStyle}/>
                            <label htmlFor={'passwordInput'}>Contraseña:</label>
                        </div>
                        <input type={"password"} id={'passwordInput'} placeholder={'Ingrese su contraseña...'}/>

                        <button type={"submit"}>Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        </div>
    )
}