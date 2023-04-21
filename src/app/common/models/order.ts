import { CartItem } from "./cart-item";

export class Order {
    constructor(
        public id: string,
        public date: string,
        public products: CartItem[],
        public status?: OrderStatus,
    ) { }
}

enum OrderStatus {
    NEW = 'New',
    PROCESSING = 'Processing',
    SHIPPED = 'Shipped',
    DELIVERED = 'Delivered',
    CANCELLED = 'Cancelled'
}