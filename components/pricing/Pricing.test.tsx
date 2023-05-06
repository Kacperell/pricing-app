import { describe, expect, test, it } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Prcing from "./index";
import { offers, years } from "./offer";

describe("Pricing", () => {
  render(<Prcing />);
  const user = userEvent.setup();
  it("Check if changing the offer year works", async () => {
    expect(screen.getByText(years[0])).toBeDefined();
    await user.click(screen.getByText(years[0]));
    await user.click(screen.getByText(years[1]));
    expect(screen.getByText(years[1])).toBeDefined();
  });
  it("Check if all services are visible", async () => {
    offers[1].services.forEach((service) => {
      expect(
        screen.getByText(`${service.name} - ${service.price} zł`)
      ).toBeDefined();
    });
    expect(screen.getAllByRole("checkbox").flat().length).toEqual(
      offers[1].services.length
    );
  });
  it("Check if the starting price is zero", async () => {
    expect(screen.getByText(`Łączna cena:0 zł`)).toBeDefined();
  });
});
