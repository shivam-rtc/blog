import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../features/auth/Login";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { login } from "../app/slices/authSlice";

// Create a mock store
const mockStore = configureStore([]);
const mockNavigate = vi.fn();

// Mock react-router-dom properly
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the login action creator
vi.mock("../app/slices/authSlice", async () => {
  const actual = await vi.importActual("../app/slices/authSlice");
  return {
    ...actual,
    login: vi.fn((data) => ({ type: "auth/login", payload: data })),
  };
});

describe("Login Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      auth: { user: null },
    });
    store.dispatch = vi.fn();
    vi.clearAllMocks();
  });

  test("renders login component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Login up with email/i)).toBeInTheDocument();
    expect(screen.getByTestId("usermail-1")).toBeInTheDocument();
    expect(screen.getByTestId("password-2")).toBeInTheDocument();
    expect(screen.getByTestId("btn-3")).toBeInTheDocument();
  });

  test("updates input values", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Test email input
    const mailInput = screen.getByTestId("usermail-1");
    fireEvent.change(mailInput, { target: { value: "John@gmail.com" } });
    expect(mailInput).toHaveValue("John@gmail.com");

    // Test password input
    const passwordInput = screen.getByTestId("password-2");
    fireEvent.change(passwordInput, { target: { value: "John@1234" } });
    expect(passwordInput).toHaveValue("John@1234");
  });

  test("triggers login function on submit", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Fill inputs
    const emailInput = screen.getByTestId("usermail-1");
    const passwordInput = screen.getByTestId("password-2");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });

    // Click login button
    const loginBtn = screen.getByTestId("btn-3");
    fireEvent.click(loginBtn);

    // Assert dispatch was called with login action created with the correct parameters
    expect(login).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "1234",
    });
    expect(store.dispatch).toHaveBeenCalled();

    // Ensure navigation occurs after dispatch
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
