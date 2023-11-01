import React from "react";
import SideBar from "../sideBarComponent/sideBar";
import styles from "./repairRequestPlataform.module.css";
import Textinput from "../../ui/Textinput";
import InputGroup from "../../ui/InputGroup";
import Icons from "../../ui/Icon";
import Select from "../../ui/Select";
const options = [
  {
    value: "option1",
    label: "Option 1",
  },
  {
    value: "option2",
    label: "Option 2",
  },
  {
    value: "option3",
    label: "Option 3",
  },
];
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
              <InputGroup
                label="Venta Asociada"
                type="text"
                name="venta_asociada"
                placeholder="Ingrese la venta asociada "
                required
                append={<Icons icon="heroicons-outline:search" />}
              />
            </div>
            {/* Datos */}
            <div>
              {/* style={{ display: "block" }} */}
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
                    <div className="selectForm">
                      <Textinput
                        label="Fecha de ingreso *"
                        name="fecha_ingreso"
                        required
                        placeholder="Ingrese fecha de ingreso"
                      />
                      <Textinput
                        label="Correo alternativo"
                        name="correo_alternativo"
                        required
                        placeholder="Ingrese un alternativo"
                      />
                    </div>
                    <Select
                      label="Estado del equipo *"
                      name="ciudad"
                      options={options.map((option) => option.label)}
                      required
                    />
                    <Select
                      label="Motivo *"
                      name="ciudad"
                      options={options.map((option) => option.label)}
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
                    cols="12"
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
