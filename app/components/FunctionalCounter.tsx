"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

interface CounterProps {
  select?: boolean;
}

// Selector function using createSelector
const getCount = createSelector(
  (state: any) => state.count.count, // Input selector (gets state as input and returns a slice of state)
  (count) => {
    // Output selector(transforms input selector(s) to return a new value)
    console.log("Computing count...", count);
    return count;
  }
);

const getValue = createSelector(
  (state: any) => state.value.value,
  (value) => {
    console.log("Computing value...", value);
    return value;
  }
);

const FunctionalCounter = ({ select = false }: CounterProps) => {
  const count = select
    ? useSelector(getCount)
    : useSelector((state: any) => {
        console.log("Computing count w/o select...", state.count.count);
        return state.count.count;
      });
  const value = select
    ? useSelector(getValue)
    : useSelector((state: any) => {
        console.log("Computing value w/o select...", state.value.value);
        return state.value.value;
      });
  const dispatch = useDispatch();
  const [numInput, setNumInput] = useState(0);
  const [input, setInput] = useState(value);
  const [renderCount, setRenderCount] = useState(0);

  const increment = () => {
    dispatch({ type: "INCREMENT" });
  };

  const decrement = () => {
    dispatch({ type: "DECREMENT" });
  };

  const incrementByValue = () => {
    dispatch({ type: "INCREMENT_BY_VALUE", payload: numInput });
  };

  const decrementByValue = () => {
    dispatch({ type: "DECREMENT_BY_VALUE", payload: numInput });
  };

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };
  const handleNumInputChange = (e: any) => {
    setNumInput(parseInt(e.target.value));
  };

  const setValue = (e: any) => {
    dispatch({ type: "SET_VALUE", payload: input });
  };

  useEffect(() => {
    console.log("FunctionalCounter rendered");
    setRenderCount((prev) => prev + 1);
  }, [count, value]);

  return (
    <div>
      <h2>Functional Component {select ? "w/ select" : "w/o select"}</h2>
      <p>count: {count}</p>
      <p>renderCount: {renderCount}</p>
      <div>
        <p>Increment/Decrement by 1</p>
        <button
          className="border-2 border-green-400 bg-green-300 rounded p-1"
          onClick={increment}
        >
          Increment
        </button>
        <button
          className="border-2 border-red-400 bg-red-300 rounded ml-4 p-1"
          onClick={decrement}
        >
          Decrement
        </button>
      </div>

      <div>
        <p>Increment/Decrement by Value</p>
        <input
          type="number"
          value={numInput}
          onChange={handleNumInputChange}
          className="border-2 border-gray-500 text-black"
        />
        <button
          className="border-2 border-green-400 bg-green-300 rounded p-1"
          onClick={incrementByValue}
        >
          Increment
        </button>
        <button
          className="border-2 border-red-400 bg-red-300 rounded ml-4 p-1"
          onClick={decrementByValue}
        >
          Decrement
        </button>
      </div>

      <br />
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="border-2 border-gray-500 text-black"
      />
      <button
        className="border-2 border-blue-400 bg-blue-300 rounded ml-2 p-1"
        onClick={setValue}
      >
        Update Value
      </button>
      <p>value: {value}</p>
    </div>
  );
};

export default FunctionalCounter;
