import Card from "../components/Card";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("Card Component", () => {
  const mockCourse = {
    _id: "123",
    title: "React Testing with Vitest",
    content: "A guide to testing React components using Vitest and RTL.",
    category: ["Testing", "React"],
    status: "published",
    image: "1743136623585-Screenshot%202025-02-04%20224426.png",
  };
  test("renders the Card component correctly", () => {
    render(
      <MemoryRouter>
        <Card course={mockCourse} />
      </MemoryRouter>
    );
    // find title
    expect(screen.getByTestId("card-wrap")).toBeInTheDocument();
    expect(screen.getByText(mockCourse.title))

    // find Image
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute(
      "src",
      `http://localhost:4000/1743136623585-Screenshot%202025-02-04%20224426.png`
    );

// read more link
const linkElement = screen.getByRole("link", { name: /read more/i });
expect(linkElement).toBeInTheDocument();
expect(linkElement).toHaveAttribute("href", `/details/${mockCourse._id}`);
  });
});
