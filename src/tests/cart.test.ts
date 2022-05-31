import { CalculateCartTotal, calculateTax } from "../services/CartService";

test("return bill with valid costs in USD", () => {
  const cartBill = CalculateCartTotal(1, 1, 1, 1);
  expect(cartBill.subtotal).toMatch(/^\$/);
  expect(cartBill.taxes).toMatch(/^\$/);
  expect(cartBill.discounts.pineapple).toMatch(/^\$/);
  expect(cartBill.discounts.strawberry).toMatch(/^\$/);
  expect(cartBill.total).toMatch(/^\$/);
});

test("calculate 14% tax", () => {
  expect(calculateTax(1)).toBe(0.14);
});
