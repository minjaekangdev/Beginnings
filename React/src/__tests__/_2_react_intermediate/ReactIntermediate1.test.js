import React from "react";
import { configure, mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter, BrowserRouter, Link } from "react-router-dom";
import App from "../../App";
import Navigate from "../../components/Navigate";
import Home from "../../components/Home";
import Page1 from "../../components/Page1";
import Page2 from "../../components/Page2";
import Page3 from "../../components/Page3";
import Product from "../../components/Product";

configure({ adapter: new Adapter() });

//#region Using Router Routes to Change Content/Views
describe("Using Router Routes to Change Content/Views", () => {
  test("App.jsx imports Home.jsx as a child component and has a default route for the Home.jsx component", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Home)).toHaveLength(1);
  });

  test("App.jsx has a route for the Page1.jsx component", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/page1"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Page1)).toHaveLength(1);
  });

  test("App.jsx has a route for the Page2.jsx component", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/page2"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Page2)).toHaveLength(1);
  });

  test("App.jsx has a route for the Page3.jsx component", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/page3"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Page3)).toHaveLength(1);
  });
});
//#endregion

//#region Using useNavigate React Router Hook
describe("Using useNavigate React Router Hook", () => {
  let navigateWrap;
  beforeEach(() => {
    navigateWrap = mount(
      <BrowserRouter>
        <Navigate />
      </BrowserRouter>
    );
  });
  afterEach(() => {
    navigateWrap.update();
  });

  it("'Go to Page 1' button exists", () => {
    expect(
      navigateWrap.containsMatchingElement(
        <button
          type="button"
          id="pg1"
          data-page="/page1"
          className="btn btn-primary"
        >
          Go to Page 1
        </button>
      )
    ).toBeTruthy();
  });

  it("'Go to Page 1' button includes the onClick handler 'goToPage'. HINT: Make sure your buttons have ids", () => {
    const buttonWrap = navigateWrap.find("#pg1");
    expect(buttonWrap.props().onClick).toEqual(expect.any(Function));
  });

  it("'Go to Page 2' button exists", () => {
    expect(
      navigateWrap.containsMatchingElement(
        <button
          type="button"
          id="pg2"
          data-page="/page2"
          className="btn btn-primary"
        >
          Go to Page 2
        </button>
      )
    ).toBeTruthy();
  });

  it("'Go to Page 2' button includes the onClick handler 'goToPage'. HINT: Make sure your buttons have ids", () => {
    const buttonWrap = navigateWrap.find("#pg2");
    expect(buttonWrap.props().onClick).toEqual(expect.any(Function));
  });

  it("'Go to Page 3' button exists", () => {
    expect(
      navigateWrap.containsMatchingElement(
        <button
          type="button"
          id="pg3"
          data-page="/page3"
          className="btn btn-primary"
        >
          Go to Page 3
        </button>
      )
    ).toBeTruthy();
  });

  it("'Go to Page 3' button includes the onClick handler 'goToPage'. HINT: Make sure your buttons have ids", () => {
    const buttonWrap = navigateWrap.find("#pg3");
    expect(buttonWrap.props().onClick).toEqual(expect.any(Function));
  });

  it("Clicking the 'Go to Page 1' button should navigate you to Page 1", () => {
    const page1Wrap = shallow(<Page1 />);
    navigateWrap.find("#pg1").simulate("click");
    navigateWrap.update();
    expect(page1Wrap.text()).toMatch(/Page 1/i);
  });

  it("Clicking the 'Go to Page 2' button should navigate you to Page 2", () => {
    const page1Wrap = shallow(<Page2 />);
    navigateWrap.find("#pg2").simulate("click");
    navigateWrap.update();
    expect(page1Wrap.text()).toMatch(/Page 2/i);
  });

  it("Clicking the 'Go to Page 3' button should navigate you to Page 3", () => {
    const page1Wrap = shallow(<Page3 />);
    navigateWrap.find("#pg3").simulate("click");
    navigateWrap.update();
    expect(page1Wrap.text()).toMatch(/Page 3/i);
  });
});
//#endregion

//#region React Router useParams Hook
describe("React Router useParams Hook", () => {
  it("App.jsx has a route to the Products component that can accommodate child routes", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/products/*"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Product)).toHaveLength(1);
  });

  it("Clicking the 'Go to Product 900' button should navigate to the url /products/900", () => {
    const wrap = mount(
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    );

    wrap.find({ children: "Go to Product 900" }).simulate("click");
    wrap.update();

    global.window = { location: { pathname: null } };
    expect(global.window.location.pathname).toEqual("/products/900");
  });

  it("Clicking the 'Go to Product 800' button should navigate to the url /products/800", () => {
    const wrap = mount(
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    );

    wrap.find({ children: "Go to Product 800" }).simulate("click");
    wrap.update();

    global.window = { location: { pathname: null } };
    expect(global.window.location.pathname).toEqual("/products/800");
  });

  it("Clicking the 'Go to Product 100' button should navigate to the url /products/100", () => {
    const wrap = mount(
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    );

    wrap.find({ children: "Go to Product 100" }).simulate("click");
    wrap.update();

    global.window = { location: { pathname: null } };
    expect(global.window.location.pathname).toEqual("/products/100");
  });

  it("Clicking the 'New Product' link should navigate to the url /products/new", () => {
    const wrap = mount(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(wrap.find(Link).at(5).props().to).toBe("/products/new");
  });
});
//#endregion
