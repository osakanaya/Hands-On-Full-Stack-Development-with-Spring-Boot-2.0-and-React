import React from "react";
import ReactDOM from "react-dom";
import App from './App';

import { calcMulti } from "./multi";

import TestRenderer from "react-test-renderer";
import AddCar from "./components/AddCar";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("2 * 3 equals 6", () => {
  expect(calcMulti(2, 3)).toBe(6);
});

it('renders a snapshot', () => {
  const tree = TestRenderer.create(<AddCar />).toJSON();
  expect(tree).toMatchSnapshot();
});
