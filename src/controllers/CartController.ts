import { Request, Response } from "express";
import { post } from "./decorators";
import { CalculateCartTotal } from "../services/CartService";

interface RequestWithBody extends Request {
  body: { [key: string]: number | undefined };
}

export interface CartObjectInUSD {
  subtotal: string;
  taxes: string;
  discounts: { [key: string]: string };
  total: string;
}
export class CartController {
  @post("/cart")
  calculateCartTotal(req: RequestWithBody, res: Response): CartObjectInUSD {
    const { apple, orange, strawberry, pineapple } = req.body;

    if (!apple && !orange && !strawberry && !pineapple) {
      res.status(400).send("Missing parameters in the request");
      return;
    }

    const calculatedCartTotal = CalculateCartTotal(apple, orange, strawberry, pineapple);

    res.send(calculatedCartTotal);
  }
}
