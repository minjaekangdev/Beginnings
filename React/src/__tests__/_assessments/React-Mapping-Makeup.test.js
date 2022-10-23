import { configure, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "../../App";
import usersService from "../../components/codeChallenge/services/usersService";
import Users from "../../components/codeChallenge/Users";
import SingleUser from "../../components/codeChallenge/SingleUser";
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";

configure({ adapter: new Adapter() });

const axios = require("axios");
jest.mock("axios");

const mockedUsersList = [
  {
    address: {
      city: "Gwenborough",
      geo: { lat: "-37.3159", lng: "81.1496" },
      street: "Kulas Light",
      suite: "Apt. 556",
      zipcode: "92998-3874",
    },
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
    email: "Sincere@april.biz",
    id: 1,
    name: "Leanne Graham",
    phone: "1-770-736-8031 x56442",
    username: "Bret",
    website: "hildegard.org",
  },
  {
    address: {
      city: "Wisokyburgh",
      geo: { lat: "-43.9509", lng: "-34.4618" },
      street: "Victor Plains",
      suite: "Suite 879",
      zipcode: "90566-7771",
    },
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
    email: "Shanna@melissa.tv",
    id: 2,
    name: "Ervin Howell",
    phone: "010-692-6593 x09125",
    username: "Antonette",
    website: "anastasia.net",
  },
  {
    address: {
      city: "McKenziehaven",
      geo: { lat: "-68.6102", lng: "-47.0653" },
      street: "Douglas Extension",
      suite: "Suite 847",
      zipcode: "59590-4157",
    },
    company: {
      name: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications",
    },
    email: "Nathan@yesenia.net",
    id: 3,
    name: "Clementine Bauch",
    phone: "1-463-123-4447",
    username: "Samantha",
    website: "ramiro.info",
  },
  {
    address: {
      city: "South Elvis",
      geo: { lat: "29.4572", lng: "-164.2990" },
      street: "Hoeger Mall",
      suite: "Apt. 692",
      zipcode: "53919-4257",
    },
    company: {
      name: "Robel-Corkery",
      catchPhrase: "Multi-tiered zero tolerance productivity",
      bs: "transition cutting-edge web services",
    },
    email: "Julianne.OConner@kory.org",
    id: 4,
    name: "Patricia Lebsack",
    phone: "493-170-9623 x156",
    username: "Karianne",
    website: "kale.biz",
  },
  {
    address: {
      city: "Roscoeview",
      geo: { lat: "-31.8129", lng: "62.5342" },
      street: "Skiles Walks",
      suite: "Suite 351",
      zipcode: "33263",
    },
    company: {
      name: "Keebler LLC",
      catchPhrase: "User-centric fault-tolerant solution",
      bs: "revolutionize end-to-end systems",
    },
    email: "Lucio_Hettinger@annie.ca",
    id: 5,
    name: "Chelsey Dietrich",
    phone: "(254)954-1289",
    username: "Kamren",
    website: "demarco.info",
  },
  {
    address: {
      city: "South Christy",
      geo: { lat: "-71.4197", lng: "71.7478" },
      street: "Norberto Crossing",
      suite: "Apt. 950",
      zipcode: "23505-1337",
    },
    company: {
      name: "Considine-Lockman",
      catchPhrase: "Synchronised bottom-line interface",
      bs: "e-enable innovative applications",
    },
    email: "Karley_Dach@jasper.info",
    id: 6,
    name: "Mrs. Dennis Schulist",
    phone: "1-477-935-8478 x6430",
    username: "Leopoldo_Corkery",
    website: "ola.org",
  },
  {
    address: {
      city: "Howemouth",
      geo: { lat: "24.8918", lng: "21.8984" },
      street: "Rex Trail",
      suite: "Suite 280",
      zipcode: "58804-1099",
    },
    company: {
      name: "Johns Group",
      catchPhrase: "Configurable multimedia task-force",
      bs: "generate enterprise e-tailers",
    },
    email: "Telly.Hoeger@billy.biz",
    id: 7,
    name: "Kurtis Weissnat",
    phone: "210.067.6132",
    username: "Elwyn.Skiles",
    website: "elvis.io",
  },
  {
    address: {
      city: "Aliyaview",
      geo: { lat: "-14.3990", lng: "-120.7677" },
      street: "Ellsworth Summit",
      suite: "Suite 729",
      zipcode: "45169",
    },
    company: {
      name: "Abernathy Group",
      catchPhrase: "Implemented secondary concept",
      bs: "e-enable extensible e-tailers",
    },
    email: "Sherwood@rosamond.me",
    id: 8,
    name: "Nicholas Runolfsdottir V",
    phone: "586.493.6943 x140",
    username: "Maxime_Nienow",
    website: "jacynthe.com",
  },
  {
    address: {
      city: "Bartholomebury",
      geo: { lat: "24.6463", lng: "-168.8889" },
      street: "Dayna Park",
      suite: "Suite 449",
      zipcode: "76495-3109",
    },
    company: {
      name: "Yost and Sons",
      catchPhrase: "Switchable contextually-based project",
      bs: "aggregate real-time technologies",
    },
    email: "Chaim_McDermott@dana.io",
    id: 9,
    name: "Glenna Reichert",
    phone: "(775)976-6794 x41206",
    username: "Delphine",
    website: "conrad.com",
  },
  {
    address: {
      city: "Lebsackbury",
      geo: { lat: "-38.2386", lng: "57.2232" },
      street: "Kattie Turnpike",
      suite: "Suite 198",
      zipcode: "31428-2261",
    },
    company: {
      name: "Hoeger LLC",
      catchPhrase: "Centralized empowering task-force",
      bs: "target end-to-end models",
    },
    email: "Rey.Padberg@karina.biz",
    id: 10,
    name: "Clementina DuBuque",
    phone: "024-648-3804",
    username: "Moriah.Stanton",
    website: "ambrose.net",
  },
];

const mockedResponse = {
  config: {},
  headers: {},
  request: "",
  status: 200,
  statusText: "",
  data: mockedUsersList,
};
axios.mockResolvedValue(mockedResponse);

describe("React Mapping Part B - Makeup", () => {
  let usersWrap;
  let container = null;
  beforeEach(() => {
    usersWrap = mount(<Users />);
    container = document.createElement("div");
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("App.jsx has a route for Users", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/users"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Users)).toHaveLength(1);
  });

  it("'Show Users' button exists. HINT: Is your button labeled correctly?", () => {
    expect(
      usersWrap.containsMatchingElement(<button>Show Users</button>)
    ).toBeTruthy();
  });

  it("'Show Users' button includes an onClick handler", () => {
    const buttonWrap = usersWrap.find("button").at(0);
    expect(buttonWrap.props().onClick).toEqual(expect.any(Function));
  });

  it("SingleUser component displays the name of each user", async () => {
    await act(async () => {
      axios.mockResolvedValue(mockedResponse);
      render(<Users />, container);
      container.querySelector("button").click();
      await new Promise((r) => setTimeout(r, 2000));
    });

    expect(container.innerHTML).toContain("Leanne Graham");
    expect(container.innerHTML).toContain("Ervin Howell");
    expect(container.innerHTML).toContain("Clementine Bauch");
    expect(container.innerHTML).toContain("Patricia Lebsack");
    expect(container.innerHTML).toContain("Chelsey Dietrich");
    expect(container.innerHTML).toContain("Mrs. Dennis Schulist");
    expect(container.innerHTML).toContain("Kurtis Weissnat");
    expect(container.innerHTML).toContain("Nicholas Runolfsdottir V");
    expect(container.innerHTML).toContain("Glenna Reichert");
    expect(container.innerHTML).toContain("Clementina DuBuque");
  });

  it("SingleUser component displays the email of each user", async () => {
    await act(async () => {
      axios.mockResolvedValue(mockedResponse);
      render(<Users />, container);
      container.querySelector("button").click();
      await new Promise((r) => setTimeout(r, 2000));
    });

    expect(container.innerHTML).toContain("Sincere@april.biz");
    expect(container.innerHTML).toContain("Shanna@melissa.tv");
    expect(container.innerHTML).toContain("Nathan@yesenia.net");
    expect(container.innerHTML).toContain("Julianne.OConner@kory.org");
    expect(container.innerHTML).toContain("Lucio_Hettinger@annie.ca");
    expect(container.innerHTML).toContain("Karley_Dach@jasper.info");
    expect(container.innerHTML).toContain("Telly.Hoeger@billy.biz");
    expect(container.innerHTML).toContain("Sherwood@rosamond.me");
    expect(container.innerHTML).toContain("Chaim_McDermott@dana.io");
    expect(container.innerHTML).toContain("Rey.Padberg@karina.biz");
  });

  it("GET endpoint exists in the usersService file. HINT: Service method should be called 'getUsers'", () => {
    const mockedResponse = {
      config: {},
      headers: {},
      request: "",
      status: 200,
      statusText: "",
      data: mockedUsersList,
    };
    axios.get.mockResolvedValue(mockedResponse);
    usersService.getUsers();
  });

  it("getUsers in axios service file works correctly", () => {
    axios.mockResolvedValue();

    usersService.getUsers();

    expect(axios).toBeCalledWith({
      crossdomain: true,
      url: "https://jsonplaceholder.typicode.com/users",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      method: "GET",
    });
  });

  it("Clicking the 'Console Log Id' button console logs the id of the user", () => {
    const mockedUser = {
      name: "Test",
      email: "test@mail.com",
      id: expect.any(Number),
    };
    const singleUserWrap = mount(<SingleUser user={mockedUser} />);
    const buttonWrap = singleUserWrap.find("button").at(0);
    const logSpy = jest.spyOn(console, "log");

    buttonWrap.simulate("click");
    singleUserWrap.update();
    expect(console.log).toHaveBeenCalled();

    expect(logSpy).toHaveBeenCalledWith(mockedUser.id);
  });
});
