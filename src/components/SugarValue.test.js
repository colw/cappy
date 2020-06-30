import regeneratorRuntime from "regenerator-runtime";
import "@testing-library/jest-dom";

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SugarValue from "./SugarValue";

describe("SugarValue", () => {
  test("renders with no value given", async () => {
    const { container, getByText } = render(<SugarValue />);
    expect(container.firstChild).toMatchSnapshot();
    expect(getByText(/0/)).toBeInTheDocument();
    expect(getByText(/⇼/)).toBeInTheDocument();
  });

  test("renders glucose value", async () => {
    const { container, getByText } = render(
      <SugarValue sgv={123} direction="Flat" />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(getByText(/123/)).toBeInTheDocument();
    expect(getByText(/→/)).toBeInTheDocument();
  });
});
