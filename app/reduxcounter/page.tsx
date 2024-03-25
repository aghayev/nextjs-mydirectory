'use client';

import React from 'react';
import type { RootState } from '../GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import {increment, decrement, incrementByAmount } from '../GlobalRedux/Festures/counter/counterSlice';

const ReduxcounterPage = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

  return (
    <div>
        <button onClick={() => dispatch(increment())}>
            Increment
        </button>
        <button onClick={() => dispatch(decrement())}>
            Decrement
        </button>
        <button onClick={() => dispatch(incrementByAmount(2))}>
            Increment By 2
        </button>
        <span>{count}</span>
    </div>
  )
}

export default ReduxcounterPage
