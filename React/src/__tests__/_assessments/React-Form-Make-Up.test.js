import React from "react";
import { configure, mount } from "enzyme";
import Comment from "../../components/codeChallenge/Comment";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });

const axios = require("axios");
jest.mock("axios");
describe("React Forms Make Up", () => {
  let wrap;
  beforeEach(() => {
    wrap = mount(<Comment />);
  });
  afterEach(() => {
    wrap.update();
  });

  it("App.jsx has a route for Comment", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/comment"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Comment)).toHaveLength(1);
  });

  it("Form element is rendered", () => {
    expect(wrap.exists("form")).toEqual(true);
  });

  it("Form-group class exists on the form", () => {
    expect(wrap.exists("div.form-group")).toEqual(true);
  });

  it("Input for title exists on the form. HINT: do you have an id property?", () => {
    expect(wrap.containsMatchingElement(<input id="title" />)).toBeTruthy();
  });

  it("Input for body exists on the form. HINT: do you have an id property?", () => {
    expect(wrap.containsMatchingElement(<input id="body" />)).toBeTruthy();
  });

  it("Input for userId exists on the form. HINT: do you have an id property?", () => {
    expect(wrap.containsMatchingElement(<input id="userId" />)).toBeTruthy();
  });

  it("'Submit' button exists. HINT: Button text should say 'Submit'", () => {
    expect(wrap.containsMatchingElement(<button>Submit</button>)).toBeTruthy();
  });

  it("'Submit' button includes an onClick handler", () => {
    //using .any(Function) here because students may have different func names
    const buttonWrap = wrap.find("button").at(0);
    expect(buttonWrap.props().onClick).toEqual(expect.any(Function));
  });

  test("POST endpoint exists in service file. HINT: Service method should be called 'addComment'", () => {
    const commentService = require("../../components/codeChallenge/services/commentService");
    const mockedResponse = {
      data: {},
      config: {},
      headers: {},
      request: "",
      status: 201,
      statusText: "Created",
    };

    axios.post.mockResolvedValue(mockedResponse);
    commentService.addComment();
  });

  it("addComment in axios service file works correctly", () => {
    const {
      addComment,
    } = require("../../components/codeChallenge/services/commentService");

    axios.mockResolvedValue();

    const mockComment = {
      title: "Rocktopus title",
      body: "This is a comment about the weirdest thing I've ever 3D printed",
      userId: 400,
    };

    addComment(mockComment);

    expect(axios).toBeCalledWith({
      crossdomain: true,
      data: mockProduct,
      url: "https://jsonplaceholder.typicode.com/posts",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      method: "POST",
    });
  });

  it("Submit button calls addComment in service file", () => {
    axios.mockResolvedValue();
    const buttonWrap = wrap.find("button").at(0);

    buttonWrap.simulate("click");
    expect(axios).toHaveBeenCalled();
  });
});
