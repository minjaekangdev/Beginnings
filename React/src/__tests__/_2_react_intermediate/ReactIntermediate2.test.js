import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "../../App";

configure({ adapter: new Adapter() });

describe("React Forms - Binding State to Text Inputs - Hooks", () => {
  const appWrap = mount(<App />);
  it("Form element is rendered", () => {
    expect(appWrap.exists("form")).toEqual(true);
  });

  it("Input for firstName exists on the form", () => {
    expect(
      appWrap.containsMatchingElement(<input id="firstName" />)
    ).toBeTruthy();
  });

  it("Input for lastName exists on the form", () => {
    expect(
      appWrap.containsMatchingElement(<input id="lastName" />)
    ).toBeTruthy();
  });

  it("On change, the firstName input's value will update. HINT: Does your input have onChange and value properties?", () => {
    const input = appWrap.find("input").at(0);
    input.simulate("change", { target: { value: "firstName" } });
    const relocatedInput = appWrap.find("input").at(0);
    expect(relocatedInput.props().value).toEqual(expect.any(String));
  });

  it("On change, the lastName input's value will update. HINT: Does your input have onChange and value properties?", () => {
    const input = appWrap.find("input").at(1);
    input.simulate("change", { target: { value: "firstName" } });
    const relocatedInput = appWrap.find("input").at(1);
    expect(relocatedInput.props().value).toEqual(expect.any(String));
  });
});
