import React from "react";
import SideBar from "../sideBarComponent/sideBar";
import styles from "./repairRequestPlatform.module.css";

const RepairRequestPlatform = () => {
  return (
    <div className={styles.mainContainer}>
      <SideBar />
      <div className={styles.bodyContainer}>
        <div className={styles.form}>
          <h1>Generar solicitud</h1>

          {/* Venta Asociada */}
          <div className={styles.sale}>
            <label>Venta asociada*</label>
            <input type="text" id="venta" name="venta" required />
          </div>

          {/* Datos */}
          <h2>Datos</h2>
          <div className={styles.dataContainer}>
            <FormData
              label="Nombre y Apellidos"
              name="nombre_apellidos"
              readOnly
            />
            <FormData
              label="Telefono de contacto"
              name="contacto"
              type="number"
              readOnly
            />
            <FormData
              label="Correo asociado"
              name="email"
              type="email"
              readOnly
            />
            <FormData label="DNI" name="dni" type="number" readOnly />
            <FormData label="Servicio/Modelo" name="servicio_modelo" readOnly />
            <FormData label="Garantía" name="garantia" type="number" readOnly />
          </div>

          {/* Solicitud */}
          <h2>Solicitud</h2>
          <form style={{position:"relative"}} action="/RepairRequest" method="post">
            <div className={styles.request}>
              <div style={{marginTop:"1.5em"}}>
                <div style={{ display: "flex" , justifyContent:"space-between",paddingBottom:"1.5em"}}>
                  <FormData
                    label="Fecha de ingreso *"
                    name="fecha_ingreso"
                    required
                  />
                  <SelectData
                    label="Motivo *"
                    name="ciudad"
                    options={["pantalla", "bateria", "otro"]}
                    required
                  />
                </div>
                <SelectData
                  label="Estado del equipo *"
                  name="ciudad"
                  options={["estado1", "estado2", "estado3"]}
                  required
                />
                <FormData
                  label="Correo alternativo"
                  name="correo_alternativo"
                  required
                />
                <div>
                  <label>
                    *Se enviará una notificación al correo asociado y/o
                    alternativo
                  </label>
                </div>
              </div>
              <TextareaData
                label="Descripcion *"
                name="descripcion"
                rows="8"
                cols="18"
                required
              />
              <button type="submit" className={styles.btnEnviar}>Enviar</button>
            </div>

            
          </form>
        </div>
      </div>
    </div>
  );
};

const FormData = ({
  label,
  name,
  type = "text",
  readOnly = false,
  required = false,
}) => (
  <div style={{ display: "flex", flexDirection: "column"}}>
    <label>{label}</label>
    <input type={type} name={name} readOnly={readOnly} required={required} />
  </div>
);

const SelectData = ({ label, name, options, required = false }) => (
  <div style={{ display: "flex", flexDirection: "column", width:"10em",paddingtop:"1em" ,paddingBottom:"1.5em"}}>
    <label>{label}</label>
    <select id={name} name={name} required={required} style={{height:"2.5em"}}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const TextareaData = ({ label, name, rows, cols, required = false }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label>{label}</label>
    <textarea
      id={name}
      name={name}
      rows={rows}
      cols={cols}
      required={required}
    ></textarea>
  </div>
);

export default RepairRequestPlatform;

