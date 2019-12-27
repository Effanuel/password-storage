import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import axios from "axios";
import { store } from "../redux/store";

import { SearchContainer, SearchBarContainer } from "../containers";
import { Card, Loader } from "../components";

jest.mock("axios");
const flushAllPromises = () => new Promise(resolve => setTimeout(resolve, 0));
const onSearchMock = jest.fn();
const render = () =>
  mount(
    <Provider store={store()}>
      <SearchContainer onChange={onSearchMock} />
    </Provider>
  );

const cards = {
  data: {
    data: [
      {
        _id: 0,
        name: "Email",
        login: "gmail.com",
        password: "112h31h2h34b2-2b342b342-b234b2"
      },
      {
        _id: 1,
        name: "Social",
        login: "facebook.com",
        password: "be2341234b2-2wbeqwbeqwbe42-4m674m6ub2"
      },
      {
        _id: 1,
        name: "Games",
        login: "steam.com",
        password: "n4b24b2345234b2-m3gm32-1231434b2"
      }
    ]
  }
};

test("should render loading followed by cards", async () => {
  axios.get.mockReturnValue(new Promise(resolve => resolve(cards)));
  const component = render();

  // Check loading
  expect(component.find(Loader).prop("loading")).toBe(true);
  expect(component.find(Card).exists()).toBe(false);

  await flushAllPromises();
  component.update();
  // Check if its not loading and cards are rendered
  expect(component.find(Loader).prop("loading")).toBe(false);
  expect(component.find(Card).exists()).toBe(true);
  component.find(Card).forEach((node, i) => {
    expect(node.prop("name")).toBe(cards.data.data[i].name);
  });

  // const event = {
  //   target: { value: "bqwbeqwbeqweqwveqwvqwe" }
  // };
  // const input = component.find(SearchBarContainer);

  // input.simulate("change", event);
  // input.update();

  // component.update();
  // expect(component.find(Card).exists()).toBe(false);

  // component.find(Card).forEach((node, i) => {
  //   expect(node.prop("name")).toBe("Social");
  // });

  // component.instance().setState({ copied: 2 });
  // component.update();
  // expect(input.props.placeholder).toEqual("Search...");
  // // component.find(SearchContainer).setState({ filtered: [{ name: "OK" }] });
  // // expect(input.props().placeholder).toBe("Search...");
  // // expect(component.state().filtered).toEqual(["Email"]);

  // // expect(component.find(SearchBarContainer).simulate("change", event));
  // // expect(onSearchMock).toBeCalledWith("email");
});
