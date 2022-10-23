import React from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { shallow } from "enzyme";
import { App } from "../../../SF.react-start-here/src/App";

jest.mock("../../../SF.react-start-here/src/services/carService");
describe("App.jsx", () => {
  const wrap = shallow(<App />);

  it(`Contains the text "hello world I love code"`, () => {
    expect(wrap.text()).toMatch(/hello world i love code/i);
  });

  it("React clock is imported and rendered", () => {
    expect(wrap.containsMatchingElement(<Clock />)).toEqual(true);
  });
});
