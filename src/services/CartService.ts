import { CartObjectInUSD } from "../controllers/CartController";

interface PriceObject {
  [key: string]: number;
}

interface CartObject {
  subtotal: number;
  taxes: number;
  discounts: { [key: string]: number };
  total: number;
}

export class CartService {
  static CalculateCartTotal(apple?: number, orange?: number, strawberry?: number, pineapple?: number): CartObjectInUSD {
    const cartTotal = {
      subtotal: 0,
      taxes: 0,
      discounts: { pineapple: 0, strawberry: 0 },
      total: 0,
    };

    const priceList: PriceObject = {
      apple: 10.99,
      orange: 14.99,
      strawberry: 19.99,
      pineapple: 24.99,
    };

    const cartItemArray: PriceObject[] = [{ apple }, { orange }, { strawberry }, { pineapple }].filter((item) => {
      return typeof Object.values(item)[0] !== "undefined";
    });

    // calculate subtotal, taxes, and total for each item in cart
    cartItemArray.forEach((item: PriceObject) => {
      const fruitName = Object.keys(item)[0];
      const { subtotal, taxes, total }: PriceObject = this.calculateTotalPerItem(item[fruitName], priceList[fruitName]);

      cartTotal.subtotal += subtotal;
      cartTotal.taxes += taxes;
      cartTotal.total += total;
    });

    // discount: buy two apples, get one strawberry 50% off
    if (apple >= 2 && strawberry) {
      const numberOfStrawberriesInCart: number = strawberry;
      const amountOfPossibleDiscountedStrawberries: number = apple % 2 === 0 ? apple / 2 : (apple - 1) / 2;

      if (amountOfPossibleDiscountedStrawberries >= numberOfStrawberriesInCart) {
        const discount: number = (numberOfStrawberriesInCart * priceList.strawberry) / 2;

        cartTotal.discounts.strawberry = discount;
      } else {
        const nonDiscountedStrawberries: number = numberOfStrawberriesInCart - amountOfPossibleDiscountedStrawberries;
        const discount: number = (numberOfStrawberriesInCart - nonDiscountedStrawberries) / 2;

        cartTotal.discounts.strawberry = discount;
      }

      cartTotal.total -= cartTotal.discounts.strawberry;
    }

    // discount: pineapples 10% off
    if (pineapple) {
      const pineappleCostBeforeTax: number = pineapple * priceList.pineapple;
      const discount: number = pineappleCostBeforeTax * 0.1;

      cartTotal.discounts.pineapple = discount;
      cartTotal.total -= cartTotal.discounts.pineapple;
    }

    return this.formatCartPrices(cartTotal);
  }

  static calculateTax(itemPrice): number {
    return itemPrice * 0.14;
  }

  static calculateTotalPerItem(item: number, itemPrice: number): PriceObject {
    const subtotal = item * itemPrice;
    const taxes = this.calculateTax(subtotal);
    return { subtotal, taxes, total: subtotal + taxes };
  }

  static formatCartPrices(total: CartObject): CartObjectInUSD {
    return {
      subtotal: `$${total.subtotal.toFixed(2)}`,
      taxes: `$${total.taxes.toFixed(2)}`,
      discounts: {
        pineapple: `$${total.discounts.pineapple.toFixed(3)}`,
        strawberry: `$${total.discounts.strawberry.toFixed(3)}`,
      },
      total: `$${total.total.toFixed(4)}`,
    };
  }
}
