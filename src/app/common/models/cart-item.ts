import { Product } from "./product";

export class CartItem {
  constructor(
    public id: string,
    public quantity: number,
    public product?: Product,
  ) { }
}