import React from "react";
import { mount } from "enzyme";
import InternalClock from "../../../SF.react-start-here/src/examples/InternalClock";
import WMessage from "../../../SF.react-start-here/src/generic/WelcomeMessage";

import Clock from "react-clock";

describe("InternalClock.jsx", () => {
  let wrap;
  beforeEach(() => {
    wrap = mount(<InternalClock />);
  });
  afterEach(() => {
    wrap.update();
  });

  it("React clock is imported and rendered", () => {
    expect(wrap.containsMatchingElement(<Clock />)).toEqual(true);
  });

  it("React clock should have a prop for value", () => {
    wrap.find("Clock").prop("value");
  });

  it("React clock should have a prop for renderNumbers", () => {
    wrap.find("Clock").prop("renderNumbers");
  });

  it("The WelcomeMessage component is imported and rendered", () => {
    expect(wrap.containsMatchingElement(<WMessage />)).toEqual(true);
  });
});
