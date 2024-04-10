'use client';
import React from 'react';
import type { RootState } from '../GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import {increment, decrement, incrementByAmount } from '../GlobalRedux/Festures/counter/counterSlice';
import styles from './layout.module.css'

const ReduxcounterPage = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

  return (
    <>
    <button onClick={() => history.back()}><strong>back</strong></button>
    <ul>
        <li>
        <button onClick={() => dispatch(increment())} className={styles.button}>
            Increment
        </button>
        </li>
        <li>
        <button onClick={() => dispatch(decrement())} className={styles.button}>
            Decrement
        </button>
        </li>
        <li>        
        <button onClick={() => dispatch(incrementByAmount(2))} className={styles.button}>
            Increment By 2
        </button>
        </li>
    </ul>
    <span>Result: {count}</span>
    </>
  )
}

export default ReduxcounterPage
