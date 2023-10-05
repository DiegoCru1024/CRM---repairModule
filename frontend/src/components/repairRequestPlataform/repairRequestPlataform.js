import SideBar from "../sideBarComponent/sideBar";
import styles from './repairRequestPlataform.module.css'
const RepairRequestPlataform = ()=>{
    return (
        <div className={styles.mainContainer}>
            <SideBar/>
            <div>
                <h1>Generar solicitud</h1>
                <form action="/submit" method="post">
                    <div>
                        <label>Venta asociada*</label>
                        <input type="text" id="venta" name="venta" required></input>
                    </div>
										<div>
											<h2>Datos</h2>
												<label>Nombre y Apellidos</label>
												<input type="text" name="nombre_apellidos"readOnly></input>
												<label>Telefono de contacto</label>
												<input type="number" name="contacto" readOnly ></input>
												<label>Correo asociado</label>
												<input type="email" name="email" readOnly ></input>
												<label>DNI</label>
												<input type="number" name="dni" readOnly ></input>
												<label>Servicio/Modelo</label>
												<input type="text" name="servicio_modelo" readOnly ></input>
												<label>Garantía</label>
												<input type="number" name="garantia" readOnly ></input>
										</div>
										<div>
											<button type="submit">Enviar</button>
										</div>
                </form>
            </div>
        </div>
    )
}
export default RepairRequestPlataform;