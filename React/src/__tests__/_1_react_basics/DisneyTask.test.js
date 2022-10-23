import React from "react";
import { mount, configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Disney from "../../examples/Disney";
import App from "../../App";

configure({ adapter: new Adapter() });

describe("Disney - Task: Change State Using Click Handlers", () => {
  let sayHello = jest.fn();
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
  const shallowAppWrapper = shallow(
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

  it("The state of App.jsx should be changed: firstName should be 'Michael' and friends should include an entry for 'Goofy'", () => {
    appWrapper.update();
    expect(appWrapper.state().currentUser).toEqual({
      age: expect.any(Number),
      firstName: "Michael",
      friends: [{ name: "Minnie" }, { name: "Pluto" }, { name: "Goofy" }],
      lastName: "Mouse",
    });
  });

  it("'Change Last Name' button exists", () => {
    expect(
      appWrapper.containsMatchingElement(<button>Change Last Name</button>)
    ).toBeTruthy();
  });

  it("'Change Last Name' button includes an onClick handler", () => {
    const buttonWrap = appWrapper.find("button").at(0);
    expect(buttonWrap.props().onClick).toEqual(expect.any(Function));
  });

  it("'Change Last Name' button changes last name", () => {
    const button = shallowAppWrapper.find("button").at(0);
    button.simulate("click");
    shallowAppWrapper.update();
    expect(shallowAppWrapper.state().currentUser.lastName).not.toBe("Mouse");
  });

  it("'Remove All Friends' button exists", () => {
    expect(
      appWrapper.containsMatchingElement(<button>Remove All Friends</button>)
    ).toBeTruthy();
  });

  it("'Remove All Friends' button includes an onClick handler", () => {
    const buttonWrap = appWrapper.find("button").at(1);
    expect(buttonWrap.props().onClick).toEqual(expect.any(Function));
  });

  it("'Remove All Friends' button removes all friends", () => {
    const button = shallowAppWrapper.find("button").at(1);
    button.simulate("click");
    shallowAppWrapper.update();
    expect(shallowAppWrapper.state().currentUser.friends).toEqual([]);
  });
});
