import styles from "./loginPage.module.css";
import logo from "../../assets/images/backgroundVector.png";
import vector from "../../assets/images/backgroundVector.png";
import {BiUserCircle, BiLock} from "react-icons/bi";
import {useState} from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/userSlice";
import {useNavigate} from "react-router-dom";
import MessageMediator from "../../mediators/messageMediator";

const iconStyle = {color: "#002388", fontSize: 30, marginRight: 5};

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const messageMediator = new MessageMediator()
    const [waitingResponse, setWaitingResponse] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setWaitingResponse(true);
            const url =
                "https://reapir-module-crm-230927095955.azurewebsites.net/api/User/Login";
            const response = await axios.post(url, loginData);
            const payload = jwtDecode(response.data.token);
            const userData = {
                token: response.data.token,
                userID:
                    payload[
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                        ],
                name: payload[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                    ],
                role: payload[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                    ],
            }
            dispatch(setUser(userData));
            navigate("/dashboard");
        } catch (e) {
            setWaitingResponse(false);
            messageMediator.showMessage(e.response.data.message, 'error')
        }
    };
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
                            <label htmlFor={"userInput"}>Correo:</label>
                        </div>
                        <input
                            type={"text"}
                            id={"userInput"}
                            name={"email"}
                            placeholder={"Ingrese su correo..."}
                            onChange={handleChange}
                            value={loginData.email}
                        />

                        <div className={styles.labelWrapper}>
                            <BiLock style={iconStyle}/>
                            <label htmlFor={"passwordInput"}>Contraseña:</label>
                        </div>
                        <input
                            type={"password"}
                            id={"passwordInput"}
                            name={"password"}
                            placeholder={"Ingrese su contraseña..."}
                            onChange={handleChange}
                            value={loginData.password}
                        />

                        <button type={"submit"} disabled={waitingResponse}>
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
