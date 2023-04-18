import { CartItem } from "./cart-item";

export class Cart {
    constructor(
        public userId: string,
        public products: CartItem[],
    ) { }
}