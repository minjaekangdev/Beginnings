import React from "react";
import { shallow, configure, mount } from "enzyme";
import App from "../../App";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

describe("Getting started with React Testing", () => {
  const shallowAppWrap = shallow(<App />);
  let appWrap;
  beforeEach(() => {
    appWrap = mount(<App />);
  });
  afterEach(() => {
    appWrap.update();
  });

  it("'Learn React' is rendered on the page", () => {
    expect(shallowAppWrap.text()).toMatch(/Learn React/i);
  });

  it("The renderNumber function should return 1 + 1 and it should be invoked in the app header", () => {
    expect(shallowAppWrap.text()).toMatch(/2/i);
  });
});
