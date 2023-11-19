
import React, { useState } from 'react';
import styles from '../requestTechnicSolicitude/EditModalmodule.css';

const EditModal = ({ isOpen, onClose, onSave, initialValues }) => {
  const [editedValues, setEditedValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedValues);
    onClose();
  };

  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2>Edit Values</h2>
          <label>
            ID:
            <input type="text" name="id" value={editedValues.id} onChange={handleChange} />
          </label>
          <label>
            Fecha:
            <input type="text" name="fecha" value={editedValues.fecha} onChange={handleChange} />
          </label>
          {/* Add more input fields for other columns as needed */}
          <div className={styles.modalButtons}>
            <button onClick={handleSave}>Guardar</button>
            <button onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditModal;
