import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import Signup from "../features/auth/Signup";
import { store } from "../app/store";

describe("Signup Component", () => {
  test("renders Signup form correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Sign up with email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/user@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByText("Signup")).toBeInTheDocument();
  });

  test("updates input values when typing", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );

    // Test name input
    const nameInput = screen.getByTestId("btn1");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput).toHaveValue("John Doe");

    // Test email input with invalid format
    const emailInput = screen.getByPlaceholderText("user@gmail.com");
    fireEvent.change(emailInput, { target: { value: "johndoeexample" } });
    expect(emailInput).toHaveValue("johndoeexample");

    // Click the signup button to trigger validation
    const signupButton = screen.getByRole("button", { name: "Signup" });
    fireEvent.click(signupButton);

    expect(emailInput).toBeInvalid();
  });

  test("calls signup function on form submission", () => {
    store.dispatch = vi.fn(); // Use Vitest's mock function

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    const signupButton = screen.getByRole("button", { name: "Signup" });
    fireEvent.click(signupButton);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
