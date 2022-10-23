import React from "react";
import { configure, shallow, mount } from "enzyme";
import OfClass from "../../components/OfClass";
import Functional from "../../components/Functional";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

describe("setState: Using useState to change state - Basic", () => {
  const functionalWrap = shallow(<Functional />);
  const functionalMountWrap = mount(<Functional />);
  const ofClassWrap = shallow(<OfClass />);

  it("OfClass.jsx component has a state object with an age property", () => {
    expect(ofClassWrap.state().age).toEqual(expect.any(Number));
  });

  it("The age property in the Functional.jsx component's state is rendered on the page", () => {
    expect(functionalWrap.text()).toContain("30");
  });

  it("Functional.jsx component has a 'Command 1' button", () => {
    expect(
      functionalWrap.containsMatchingElement(
        <button className="nav-link active btn-link btn " aria-current="page">
          Command 1
        </button>
      )
    ).toBeTruthy();
  });

  it("Functional.jsx component's 'Command 1' button includes the onClick handler 'onClickOne'", () => {
    const button = functionalMountWrap.find({ children: "Command 1" });
    expect(button).toHaveLength(1);
    expect(button.props().onClick).toEqual(expect.any(Function));
  });

  it("OfClass.jsx component has a 'Command 1' button", () => {
    expect(
      ofClassWrap.containsMatchingElement(
        <button className="nav-link active btn-link btn " aria-current="page">
          Command 1
        </button>
      )
    ).toBeTruthy();
  });

  it("OfClass.jsx component's 'Command 1' button includes the onClick handler 'onClickOne'", () => {
    const button = ofClassWrap.find({ children: "Command 1" });
    expect(button).toHaveLength(1);
    expect(button.props().onClick).toEqual(expect.any(Function));
  });

  it("On click of OfClass.jsx's 'Command 1' button should increment age by 1", () => {
    expect(ofClassWrap.state("age")).toEqual(30);
    ofClassWrap
      .find({ children: "Command 1" })
      .simulate("click", { preventDefault() {} });
    expect(ofClassWrap.state().age).toEqual(31);
  });

  it("On click of Functional.jsx's 'Command 1' button should increment age by 1", () => {
    expect(functionalWrap.text()).toContain("30");
    functionalWrap
      .find({ children: "Command 1" })
      .simulate("click", { preventDefault() {} });
    functionalWrap.update();
    expect(functionalWrap.text()).toContain("31");
  });
});
