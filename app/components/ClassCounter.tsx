"use client";
import React, { Component, ChangeEvent } from "react";
import { connect, ConnectedProps } from "react-redux";
import { createSelector } from "reselect";

interface RootState {
  count: {
    count: number;
  };
  value: {
    value: string;
  };
}

interface ClassCounterState {
  input: string;
  numInput: number;
  renderCount: number;
}

const getCount = createSelector(
  (state: RootState) => state.count.count,
  (count) => {
    console.log("Computing count...", count);
    return count;
  }
);

const getValue = createSelector(
  (state: RootState) => state.value.value,
  (value) => {
    console.log("Computing value...", value);
    return value;
  }
);

// Define the root state type
type RootProps = ConnectedProps<typeof connector>;

class ClassCounter extends Component<RootProps, ClassCounterState> {
  state = {
    numInput: 0,
    input: this.props.value,
    renderCount: 0,
  };

  componentDidMount() {
    console.log("ClassComponent rendered");
  }

  componentDidUpdate(prevProps: RootProps) {
    if (
      prevProps.count !== this.props.count ||
      prevProps.value !== this.props.value
    ) {
      this.setState((prevState) => ({
        renderCount: prevState.renderCount + 1,
      }));
    }
  }

  increment = () => {
    this.props.dispatch({ type: "INCREMENT" });
  };

  decrement = () => {
    this.props.dispatch({ type: "DECREMENT" });
  };

  incrementByValue = () => {
    this.props.dispatch({
      type: "INCREMENT_BY_VALUE",
      payload: this.state.numInput,
    });
  };

  decrementByValue = () => {
    this.props.dispatch({
      type: "DECREMENT_BY_VALUE",
      payload: this.state.numInput,
    });
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  handleNumInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ numInput: parseInt(e.target.value) });
  };

  setValue = () => {
    this.props.dispatch({ type: "SET_VALUE", payload: this.state.input });
  };

  render() {
    // redux state is mapped to props through the connector
    const { count, value } = this.props;
    const { renderCount } = this.state;

    return (
      <div>
        <h2>Class-based Component w/ Select</h2>
        <p>count: {count}</p>
        <p>renderCount: {renderCount}</p>
        <div>
          <p>Increment/Decrement by 1</p>
          <button
            className="border-2 border-green-400 bg-green-300 rounded p-1"
            onClick={this.increment}
          >
            Increment
          </button>
          <button
            className="border-2 border-red-400 bg-red-300 rounded ml-4 p-1"
            onClick={this.decrement}
          >
            Decrement
          </button>
        </div>

        <div>
          <p>Increment/Decrement by Value</p>
          <input
            type="number"
            value={this.state.numInput}
            onChange={this.handleNumInputChange}
            className="border-2 border-gray-500 text-black"
          />
          <button
            className="border-2 border-green-400 bg-green-300 rounded p-1"
            onClick={this.incrementByValue}
          >
            Increment
          </button>
          <button
            className="border-2 border-red-400 bg-red-300 rounded ml-4 p-1"
            onClick={this.decrementByValue}
          >
            Decrement
          </button>
        </div>

        <br />
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleInputChange}
          className="border-2 border-gray-500 text-black"
        />
        <button
          className="border-2 border-blue-400 bg-blue-300 rounded ml-2 p-1"
          onClick={this.setValue}
        >
          Update Value
        </button>
        <p>value: {value}</p>
      </div>
    );
  }
}

// Map state to props using RootState type
const mapStateToProps = (state: RootState) => {
  return {
    count: getCount(state),
    value: getValue(state),
  };
};

// Connect the component to the store
const connector = connect(mapStateToProps);
export default connector(ClassCounter);
