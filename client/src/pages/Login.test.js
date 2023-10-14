import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";

test("User ID title should be rendered", () => {
  render(<Login />);
  const usernameInputEl = screen.getByText(/User ID:/i);
  expect(usernameInputEl).toBeInTheDocument();
});