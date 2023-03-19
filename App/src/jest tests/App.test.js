/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import renderer from "react-test-renderer";

test("Sanity Check", () => {
  const twoPlusTwo = 2 + 2;
  expect(twoPlusTwo).toStrictEqual(4);
  expect(twoPlusTwo).not.toStrictEqual(5);
});

test("[1] renders without errors", () => {
  render(<App />);
});

test("[2] renders child components", () => {
  render(<App />);
  const docHeader = document.querySelector("header");
  expect(docHeader).toBeInTheDocument();

  const h1 = screen.getByText(/pokemon 151 project/i);
  expect(h1).toBeInTheDocument();

  const bulba = screen.getByText(/bulbasaur/i);
  expect(bulba).toBeInTheDocument();
});

test("[3] Toggles Dark Mode", async () => {
  //Verifies that hitting darkmode toggle will add "dark" class to each pokemon card

  render(<App />);
  let cardOne = document.querySelector(".pokemon-card");
  expect(cardOne).not.toHaveClass("dark");

  const darkBtn = screen.getByTestId("toggle_btn");
  await userEvent.click(darkBtn);
  expect(cardOne).toHaveClass("dark");
});

// This has saved a snapshot of App.js from 5.8.2022. If anything in App changes this test will fail
//Then I will either need to update the screenshot with the new changes, or fix what error made the test fail.
//If the change is intended, run jest -u in terminal to update snapshot.
test("[4] Matches snapshot so nothing changes inadvertently", () => {
  const component = renderer.create(<App />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
