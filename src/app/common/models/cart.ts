import { CartItem } from "./cart-item";

export class Cart {
    constructor(
        public id: string,
        public products: CartItem[],
    ) { }
}