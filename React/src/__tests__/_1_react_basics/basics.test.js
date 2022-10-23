import React from "react";
import { shallow } from "enzyme";

import App from "../../../SF.react-start-here/src/App.jsx";

describe("App.jsx", () => {
  const wrap = shallow(<App />);
  it("hello", () => {
    expect(wrap.text()).toMatch(/hello world i love code/i);
  });

  it("React clock is imported and rendered", () => {
    expect(wrap.containsMatchingElement(<Clock />)).toEqual(true);
  });
});
