import React, { useState, useEffect } from 'react';
import styles from './Label.module.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLabelList,
  add,
  remove,
  unremove,
  update,
  deleteLabelOutOfList,
} from '../../../slices/LabelSlice';
import { toggleLabelForm } from '../../../slices/ShowLabelForm';
import AddLabelForm from './AddLabelForm';

const Label = () => {
  const labelList = useSelector(state => state.Label.value);
  const ShowLabelForm = useSelector(state => state.ShowLabelForm.value);
  const exampleTokenForPhuoc =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODBiNTY1ZDhhMzVhNTViMDE2MTFmYiIsImlhdCI6MTY4ODc3NDUzNSwiZXhwIjoxNjkxMzY2NTM1fQ.HB-064k-AHO7jvM4rexrZ3DfMNQX5_zM0v6tRaVM7Z8';
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchLabelList = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/users/getLabelList',
          {
            headers: {
              Authorization: `Bearer ${exampleTokenForPhuoc}`,
            },
          },
        );
        dispatch(setLabelList(response.data));
        /* This is created to ensure that labellist will not lost any label due to dispatch(remove) and dispatch(add) */
      } catch (error) {
        console.log(
          'something wrong with axios to fetch label list',
          '\n',
          error,
        );
      }
    };

    fetchLabelList();
  }, []);

  const handleAddLabelForm = () => {
    dispatch(toggleLabelForm());
  };

  const updateLabellist = label => {
    console.log('label infor:', label);
    if (!label.deleted) {
      dispatch(remove(label));
    } else {
      dispatch(unremove(label));
    }
    console.log(labelList);
  };

  const deleteLabel = async label => {
    dispatch(deleteLabelOutOfList(label));
    try {
      console.log('label to delete is', label);
      const response = await axios.delete(
        'http://localhost:5000/api/users/deleteLabelList',
        {
          data: label, // Convert label to a JSON string
          headers: {
            Authorization: `Bearer ${exampleTokenForPhuoc}`,
          },
        },
      );
      console.log('delete label successfully', response.data);
      /* This is created to ensure that labellist will not lose any label due to dispatch(remove) and dispatch(add) */
    } catch (error) {
      console.log(
        'something wrong with axios to delete the label list',
        '\n',
        error,
      );
    }
  };

  return (
    <div>
      <div style={{ marginLeft: '10px' }}>
        <b>My Calendar</b>
      </div>
      <div>
        {labelList.map(label => (
          <span className={styles.bigcheck} key={label.name}>
            {/* This is the code I copy from internet to change color of checkbox */}
            <label className={styles.bigcheck}>
              <input
                type="checkbox"
                className={styles.bigcheck}
                name="cheese"
                value="yes"
                defaultChecked
                onChange={() => {
                  updateLabellist(label);
                }}
              />
              <span
                className={styles.bigcheck_target}
                style={{ '--checkbox-color': label.color }}
              ></span>
              <span style={{ marginLeft: '5px' }}>{label.name}</span>
              <button
                style={{ marginLeft: '30px' }}
                className={styles.deletedLabelButton}
                onClick={() => deleteLabel(label)}
              >
                X
              </button>
            </label>
          </span>
        ))}
      </div>
      <button className="btn btn-primary" onClick={handleAddLabelForm}>
        Add Labels
      </button>
      {ShowLabelForm && <AddLabelForm />}
    </div>
  );
};

export default Label;
