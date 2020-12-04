import React from "react";
import ReactDOM from "react-dom";
import App from './App';

import { calcMulti } from "./multi";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("2 * 3 equals 6", () => {
  expect(calcMulti(2, 3)).toBe(6);
});
