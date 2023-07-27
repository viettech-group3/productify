import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { set, add, remove, update } from '../../../slices/LabelSlice';
import { toggleLabelForm } from '../../../slices/ShowLabelForm';
import styles from './AddLabelForm.module.css';
import { faPalette, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddLabelForm = () => {
  const [formData, setFormData] = useState({ name: '', color: '' });
  const dispatch = useDispatch();
  const exampleTokenForPhuoc = JSON.parse(localStorage.getItem('user')).token;
  const modalRef = useRef(null);
  const colors = [
    { name: 'Midnight', color: '#6485ad' },
    { name: 'Blue', color: '#a9caee' },
    { name: 'Green', color: '#a0c3d2' },
    { name: 'Purple', color: '#c8a1c9' },
    { name: 'Pink', color: '#e8a2a3' },
    { name: 'Orange', color: '#f98172' },
  ]; // Predefined label colors

  const handleOutsideClick = event => {
    /* When we click outside the modal form, it will toggle off the modal */
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      console.log('Click outside');
      dispatch(toggleLabelForm());
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(add(formData));
    dispatch(toggleLabelForm());
    try {
      const response = await axios
        .post('http://localhost:5000/api/users//addLabelList', formData, {
          headers: {
            Authorization: `Bearer ${exampleTokenForPhuoc}`,
          },
        })
        .then(response => {
          console.log(
            'data that we receive after create new label',
            response.data,
          );
        });
    } catch (error) {
      console.log(
        'There is an error when we send axios post request to create label',
        error,
      );
    }
    //setFormData
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.overlay} onClick={handleOutsideClick}>
      <div className={styles.labelForm} ref={modalRef}>
        <div className={styles.ModalTitle}>
          <button
            className={styles.closeButton}
            onClick={() => {
              dispatch(toggleLabelForm());
            }}
          >
            X
          </button>
        </div>

        <div className={styles.columns}>
          {/**first column */}
          <div className={styles.columnLabel}>
            <FontAwesomeIcon icon={faTags} className={styles.icon} />
            <FontAwesomeIcon icon={faPalette} className={styles.icon} />
          </div>

          {/**second column */}
          <div className={styles.columnTitle}>
            <span className={styles.label}>Name</span>
            <span className={styles.label}>Color</span>
          </div>

          {/**third column */}
          <div className={styles.columnInput}>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="nameInput"
                  name="name"
                  value={formData.name}
                  placeholder="Add Label Name"
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

            <div className={styles.inputContainer}>
              <div className={styles.customDropdown}>
                <div className={styles.dropdownOptions}>
                  {colors.map(colorOption => (
                    <div
                      key={colorOption.name}
                      className={styles.dropdownOption}
                      onClick={() => {
                        setFormData(prevFormData => ({
                          ...prevFormData,
                          color: colorOption.color, // Update color directly in the form data when clicked
                        }));
                      }}
                    >
                      <span
                        className={styles.labelColor}
                        style={{ backgroundColor: colorOption.color }}
                      ></span>
                      {colorOption.name}
                    </div>
                  ))}
                </div>

                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      id="colorInput"
                      name="color"
                      value={formData.color}
                      placeholder="Select Label Color"
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={styles.submitButton}
            onClick={handleSubmit}
          >
            Add Label
          </button>{' '}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddLabelForm;
