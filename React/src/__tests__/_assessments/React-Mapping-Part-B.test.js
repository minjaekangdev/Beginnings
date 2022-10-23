import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount, configure } from "enzyme";
import Cars from "../../components/codeChallenge/Cars";
import App from "../../App";
import SingleCar from "../../components/codeChallenge/SingleCar";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

const mockCarsList = [
  {
    make: "Kia",
    model: "Sorento",
    year: 2020,
  },
  {
    make: "Kia",
    model: "Optima",
    year: 2019,
  },
  {
    make: "Tesla",
    model: "Model 3",
    year: 2021,
  },
  {
    make: "Honda",
    model: "Civic",
    year: 2019,
  },
  {
    make: "Honda",
    model: "Accord",
    year: 2018,
  },
  {
    make: "Volkswagen",
    model: "Jetta",
    year: 2021,
  },
  {
    make: "Toyota",
    model: "Camry",
    year: 2021,
  },
  {
    make: "Ford",
    model: "Mustang",
    year: 2019,
  },
  {
    make: "Ford",
    model: "F-150",
    year: 2019,
  },
  {
    make: "Toyota",
    model: "Camry",
    year: 2020,
  },
  {
    make: "Ford",
    model: "F-150",
    year: 2021,
  },
];

describe("React Mapping Part B", () => {
  let carsWrap;
  beforeEach(() => {
    carsWrap = mount(<Cars />);
  });
  afterEach(() => {
    carsWrap.update();
  });

  it("App.jsx has a route for Cars", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/cars"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Cars)).toHaveLength(1);
  });

  it("SingleCar component is used to render Cars. HINT: Make sure your cars are hidden by default in state.", () => {
    carsWrap.find("button").at(0).simulate("click");
    carsWrap.update();
    expect(carsWrap.find(SingleCar).length).toEqual(11);
  });

  it("The 'Show Cars' button exists", () => {
    expect(
      carsWrap.containsMatchingElement(<button>Show Cars</button>)
    ).toBeTruthy();
  });

  it("The 'Show Cars' button includes an onClick handler", () => {
    const buttonWrap = carsWrap.find("button").at(0);
    expect(buttonWrap.props().onClick).toEqual(expect.any(Function));
  });

  it("The '2018 Cars' button exists. HINT: Do you have the correct id on the button?", () => {
    expect(carsWrap.find("#show-2018-cars")).toBeTruthy();
  });

  it("The '2019 Cars' button exists. HINT: Do you have the correct id on the button?", () => {
    expect(carsWrap.find("#show-2019-cars")).toBeTruthy();
  });

  it("The '2020 Cars' button exists. HINT: Do you have the correct id on the button?", () => {
    expect(carsWrap.find("#show-2020-cars")).toBeTruthy();
  });

  it("The '2021 Cars' button exists. HINT: Do you have the correct id on the button?", () => {
    expect(carsWrap.find("#show-2021-cars")).toBeTruthy();
  });

  it("Clicking the '2018 Cars' button shows the cars with the year 2018", () => {
    carsWrap.find("button").at(0).simulate("click");
    carsWrap.find("#show-2018-cars").simulate("click");
    carsWrap.update();
    expect(carsWrap.find(SingleCar).length).toEqual(1);
  });

  it("Clicking the '2019 Cars' button shows the cars with the year 2019", () => {
    carsWrap.find("button").at(0).simulate("click");
    carsWrap.find("#show-2019-cars").simulate("click");
    carsWrap.update();
    expect(carsWrap.find(SingleCar).length).toEqual(4);
  });

  it("Clicking the '2020 Cars' button shows the cars with the year 2020", () => {
    carsWrap.find("button").at(0).simulate("click");
    carsWrap.find("#show-2020-cars").simulate("click");
    carsWrap.update();
    expect(carsWrap.find(SingleCar).length).toEqual(2);
  });

  it("Clicking the '2021 Cars' button shows the cars with the year 2021", () => {
    carsWrap.find("button").at(0).simulate("click");
    carsWrap.find("#show-2021-cars").simulate("click");
    carsWrap.update();
    expect(carsWrap.find(SingleCar).length).toEqual(4);
  });
});
