import SideBar from "../sideBarComponent/sideBar";
import styles from "./repairRequestPlataform.module.css";
const RepairRequestPlataform = () => {
  return (
    <div className={styles.mainContainer}>
      <SideBar />
      <div>
        <h1>Generar solicitud</h1>
        <form action="/RepairRequest" method="post">
          <div className={styles.sale}>
            <label>Venta asociada*</label>
            <input type="text" id="venta" name="venta" required></input>
          </div>
          <div className={styles.dataContainer}>
            <h2>Datos</h2>
            <label>Nombre y Apellidos</label>
            <input type="text" name="nombre_apellidos" readOnly></input>
            <label>Telefono de contacto</label>
            <input type="number" name="contacto" readOnly></input>
            <label>Correo asociado</label>
            <input type="email" name="email" readOnly></input>
            <label>DNI</label>
            <input type="number" name="dni" readOnly></input>
            <label>Servicio/Modelo</label>
            <input type="text" name="servicio_modelo" readOnly></input>
            <label>Garantía</label>
            <input type="number" name="garantia" readOnly></input>
          </div>
          <div className={styles.request}>
            <h2>Solicitud</h2>
            <label>Fecha de ingreso *</label>
            <input type="text" id="venta" name="venta" required></input>
            <label>Motivo *</label>
            <select id="ciudad" name="ciudad">
              <option value="pantalla">pantalla</option>
              <option value="bateria">bateria</option>
              <option value="otro">otro</option>
            </select>
            <label>Estado del equipo *</label>
            <select id="ciudad" name="ciudad">
              <option value="estado1">estado1</option>
              <option value="estado2">estado2</option>
              <option value="estado3">estado3</option>
            </select>
            <label>Correo alternativo</label>
            <input type="text" id="venta" name="venta" required></input>
            <label>
              *Se enviará una notificación al correo asociado y/o alternativo
            </label>
            <label>Descripcion *</label>
            <textarea
              id="venta"
              name="venta"
              rows="10"
              cols="50"
              required
            ></textarea>
          </div>
          <div>
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RepairRequestPlataform;
