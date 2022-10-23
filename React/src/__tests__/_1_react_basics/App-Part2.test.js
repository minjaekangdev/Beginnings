import React from "react";
import { mount } from "enzyme";
//NOTE: students could use a difference service file, so we should discuss
//but they should all be using getPing
import * as carService from "../../../SF.react-start-here/src/services/carService";
import { App } from "../App";
import InternalClock from "../../../SF.react-start-here/src/examples/InternalClock";

jest.mock("../../../SF.react-start-here/src/services/carService");
describe("App-Part2.jsx", () => {
  let wrap;
  beforeEach(() => {
    wrap = mount(<App />);
  });
  afterEach(() => {
    wrap.update();
  });

  describe("when rendered", () => {
    it("getPing call was made", () => {
      const getSpy = jest.spyOn(carService, "getPing");
      expect(getSpy).toBeCalled();
    });
  });

  it("InternalClock component is imported and rendered", () => {
    expect(wrap.containsMatchingElement(<InternalClock />)).toEqual(true);
  });

  it("Fruits component is imported and rendered", () => {
    expect(wrap.containsMatchingElement(<Fruits />)).toEqual(true);
  });

  //it will be 0 in this test as Gregorio does not have them add fruits to the array yet
  it(`Contains the text "Fruits are going to be here: 0"`, () => {
    expect(wrap.text()).toMatch(/Fruits are going to be here: 0/i);
  });
});
