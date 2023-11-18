import {fireEvent, render} from "@testing-library/react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import NewQuestion from "../../components/NewQuestion";
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

describe("NewQuestion", () => {
    let store;
  
    let users = usersData;
    beforeEach(() => {
      store = mockStore({
        authedUser: "test-user-id",
        users: users,
      });
    });
    it("should render the component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewQuestion/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("should display all elements", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewQuestion/>
                </BrowserRouter>
            </Provider>
        );

        const firstOptionInputElement = component.getByTestId("optionOne").querySelector("input");;
        const secondOptionInputElement = component.getByTestId("optionTwo").querySelector("input");;
        const submitButtonElement = component.getByTestId("submit-poll");

        expect(submitButtonElement.textContent).toBe("Submit");

        fireEvent.change(firstOptionInputElement, {target: {value: "Learn Java"}});
        fireEvent.change(secondOptionInputElement, {target: {value: "Learn Python"}});
        expect(firstOptionInputElement.value).toBe("Learn Java");
        expect(secondOptionInputElement.value).toBe("Learn Python");
    });
});