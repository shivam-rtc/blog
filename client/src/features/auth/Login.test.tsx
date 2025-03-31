import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { describe, expect, test, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../app/store";
describe("login component", () => {
  test("render login", () => {
    //rendering component
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    // find the input fields
    expect(screen.getByText(/Login up with email/i)).toBeInTheDocument();
    expect(screen.getByTestId("usermail-1")).toBeInTheDocument();
    expect(screen.getByTestId("password-2")).toBeInTheDocument();
    expect(screen.getByTestId("btn-3")).toBeInTheDocument();
  });

  test("update input values", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Test mail input
    const mailInput = screen.getByTestId("usermail-1");
    fireEvent.change(mailInput, { target: { value: "John@gmail.com" } });
    expect(mailInput).toHaveValue("John@gmail.com");

    // Test password input
    const passwordInput = screen.getByTestId("password-2");
    fireEvent.change(passwordInput, { target: { value: "John@1234" } });
    expect(passwordInput).toHaveValue("John@1234");
  });

  // trigger signup funstion

  test("", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
  });
});
