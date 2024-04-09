'use client';

import React from 'react';
import type { RootState } from '../GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import {increment, decrement, incrementByAmount } from '../GlobalRedux/Festures/counter/counterSlice';

const ReduxcounterPage = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

  return (
    <>
    <ul>
        <li>
        <button onClick={() => dispatch(increment())}>
            Increment
        </button>
        </li>
        <li>
        <button onClick={() => dispatch(decrement())}>
            Decrement
        </button>
        </li>
        <li>        
        <button onClick={() => dispatch(incrementByAmount(2))}>
            Increment By 2
        </button>
        </li>
    </ul>
    <span>Result: {count}</span>
    </>
  )
}

export default ReduxcounterPage
