import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../../components/Login";
import configureStore from "redux-mock-store";
import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { Router } from "react-router";
import { createMemoryHistory } from "history";

const usersData = {
  "test-user-id": {
    id: "test-user-id",
    password: "test-pass",
    name: "Test User",
    avatarURL: "",
    answers: {
      "test-question-id-one": "optionOne",
    },
    questions: ["test-question-id-two"],
  },
  "test-user-id-one": {
    id: "test-user-id-one",
    password: "test-pass",
    name: "Test User",
    avatarURL: "",
    answers: {
      "test-question-id-two": "optionOne",
    },
    questions: ["test-question-id-three"],
  },
};

const mockStore = configureStore([]);

describe("Check username, password and submit button is present.", () => {
  let store;
  let component;

  let users = usersData;
  const history = createMemoryHistory();
  beforeEach(() => {
    store = mockStore({
      authedUser: "test-user-id",
      users: users,
    });

    component = renderer.create(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>
    );
  });

  test("Check username field is there in the Login component.", () => {
    component = render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>
    );
    var username = component.getAllByText(/Username/);
    expect(username.length).toEqual(1);
  });

  test("Check password field is there in the Login component.", () => {
    component = render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>
    );
    var password = component.getByTestId("password");
    expect(password).toBeInTheDocument();
  });

  test("Check Log In button is there in the Login component.", () => {
    component = render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>
    );
    var LoginButton = component.getByTestId("sign-in");
    expect(LoginButton).toBeInTheDocument();
  });
});

describe("Login component - Snapshot testing", () => {
  let store;
  let component;

  let users = usersData;
  const history = createMemoryHistory();
  beforeEach(() => {
    store = mockStore({
      authedUser: "test-user-id",
      users: users,
    });

    component = renderer.create(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>
    );
  });

  test("renders Login component with screen.debug() in UI", async () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>
    );
    screen.debug();
  });

  test("renders Login component with toMatchSnapshot in UI", () => {
    expect(component).toMatchSnapshot();
  });
});

describe("FireEvent testing with Login component", () => {
  let store;
  let component;

  let users = usersData;
  const history = createMemoryHistory();
  beforeEach(() => {
    store = mockStore({
      authedUser: "test-user-id",
      users: users,
    });

    component = renderer.create(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>
    );
  });

  test("If we do not pick one user from dropdown list, then it should popup the error message", () => {
    component = render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>
    );
    var password = component.getByTestId("password").querySelector("input");
    fireEvent.change(password, { target: { value: "123456" } });
    var LoginButton = component.getByTestId("sign-in");
    fireEvent.click(LoginButton);
    expect(component.getByTestId("error-header")).toBeInTheDocument();
  });
});
