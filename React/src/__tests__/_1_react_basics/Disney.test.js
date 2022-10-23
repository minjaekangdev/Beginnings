import React from "react";
import { mount, configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Disney from "../../examples/Disney";
import App from "../../App";

configure({ adapter: new Adapter() });

describe("Disney - Passing State & Functions To Children", () => {
  let sayHello = jest.fn();
  let disneyWrap;
  beforeEach(() => {
    disneyWrap = mount(
      <Disney
        friend={{
          age: 80,
          firstName: "Mickey",
          friends: [{ name: "Minnie" }, { name: "Pluto" }],
          lastName: "Mouse",
        }}
        showGreeting={sayHello}
      />
    );
  });
  afterEach(() => {
    disneyWrap.update();
  });
  let shallowDisneyWrapper = shallow(
    <Disney
      friend={{
        age: 80,
        firstName: "Mickey",
        friends: [{ name: "Minnie" }, { name: "Pluto" }],
        lastName: "Mouse",
      }}
      showGreeting={sayHello}
    />
  );
  let appWrapper = mount(
    <App
      friend={{
        age: 80,
        firstName: "Mickey",
        friends: [{ name: "Minnie" }, { name: "Pluto" }],
        lastName: "Mouse",
      }}
      showGreeting={sayHello}
    />
  );

  let shallowAppWrapper = mount(
    <App
      friend={{
        age: 80,
        firstName: "Mickey",
        friends: [{ name: "Minnie" }, { name: "Pluto" }],
        lastName: "Mouse",
      }}
      showGreeting={sayHello}
    />
  );

  it("The friend prop is passed from App.jsx to Disney.jsx", () => {
    expect(shallowAppWrapper.find("Disney").prop("friend")).toEqual({
      age: 80,
      firstName: expect.any(String),
      friends: expect.any(Array),
      lastName: "Mouse",
    });
  });

  it("The WelcomeMessage component is rendered within the Disney component", () => {
    expect(disneyWrap.find("WelcomeMessage").length).toEqual(1);
  });

  it("The WelcomeMessage component accepts the prop 'end' with the value 'Goodbye'", () => {
    expect(disneyWrap.find("WelcomeMessage").prop("end")).toEqual("Goodbye");
  });

  it("The Disney component has state property named 'localMessage' with the value 'I am Disney'", () => {
    expect(shallowDisneyWrapper.state("localMessage")).toBe("I am Disney");
  });

  it("The showGreeting() prop is passed from App.jsx to Disney.jsx", () => {
    const showGreeting = appWrapper.find("Disney").prop("showGreeting");
    expect(showGreeting).toEqual(expect.any(Function));
  });
});
