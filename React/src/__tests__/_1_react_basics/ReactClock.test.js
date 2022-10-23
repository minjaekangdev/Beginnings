import React from "react";
import { shallow, configure } from "enzyme";
import App from "../../App";
import Clock from "react-clock";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

describe("Third-Party Modules - Installing & Importing", () => {
  const appWrap = shallow(<App />);

  it(`Contains the text "Hello World, I Love Code" on render`, () => {
    expect(appWrap.text()).toMatch(/Hello World, I Love Code/i);
  });

  it("The React Clock is imported and rendered", () => {
    expect(appWrap.containsMatchingElement(<Clock />)).toEqual(true);
  });

  it("The Clock component has a property for value that equals new Date()", () => {
    const clock = appWrap.find(Clock);
    expect(clock.props().value).toBeTruthy();
  });

  it("The Clock component has a property for size that equals 350", () => {
    const clock = appWrap.find(Clock);
    expect(clock.props().size).toEqual(350);
  });

  it("The Clock component has a property for renderNumbers that equals true", () => {
    const clock = appWrap.find(Clock);
    expect(clock.props().renderNumbers).toEqual(true);
  });
});
