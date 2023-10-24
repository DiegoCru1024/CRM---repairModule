import React from "react";
import SideBar from "../sideBarComponent/sideBar";
import styles from "./repairRequestPlataform.module.css";
import Textinput from "../../ui/Textinput";

const RepairRequestPlataform = () => {
  return (
    <div className={styles.mainContainer}>
      <SideBar />
      <div className={styles.repairRequestContainer}>
        <div className={styles.form}>
          <div>
            {/* Venta Asociada */}
            <div className={styles.sale}>
              <h1>Generar solicitud</h1>
              <label>Venta asociada*</label>
              <input type="text" id="venta" name="venta" required />
            </div>

            {/* Datos */}
            <div style={{ display: "block" }}>
              <h2>Datos</h2>
              <div className={styles.dataContainer}>
                <Textinput
                  label="Nombre y Apellidos"
                  name="nombre_apellidos"
                  readOnly
                />
                <Textinput
                  label="Telefono de contacto"
                  name="contacto"
                  type="number"
                  readOnly
                />
                <Textinput
                  label="Correo asociado"
                  name="email"
                  type="email"
                  readOnly
                />
                <Textinput label="DNI" name="dni" type="number" readOnly />
                <Textinput
                  label="Servicio/Modelo"
                  name="servicio_modelo"
                  readOnly
                />
                <Textinput
                  label="Garantía"
                  name="garantia"
                  type="number"
                  readOnly
                />
              </div>
            </div>
            <div>
              {/* Solicitud */}
              <h2>Solicitud</h2>
              <form action="/RepairRequest" method="post">
                <div className={styles.request}>
                  <div>
                    <div style={{ display: "flex" }}>
                      <Textinput
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
                    <Textinput
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
                </div>

                <button type="submit">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectData = ({ label, name, options, required = false }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label>{label}</label>
    <select id={name} name={name} required={required}>
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

export default RepairRequestPlataform;
