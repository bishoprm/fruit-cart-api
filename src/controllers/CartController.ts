import { Request, Response } from "express";
import { post } from "./decorators";
import { CartService } from "../services/CartService";

interface RequestWithBody extends Request {
  body: { [key: string]: number | undefined };
}

export interface CartObject {
  subtotal: number;
  taxes: number;
  discounts: { [key: string]: number };
  total: number;
}

export class CartController {
  @post("/cart")
  async calculateCartTotal(req: RequestWithBody, res: Response): Promise<CartObject> {
    const { apple, orange, strawberry, pineapple } = req.body;

    if (!apple && !orange && !strawberry && !pineapple) {
      res.status(400).send("Missing parameters in the request");
      return;
    }

    const calculatedCartTotal = await CartService.CalculateCartTotal(apple, orange, strawberry, pineapple);

    res.send(calculatedCartTotal);
  }
}
