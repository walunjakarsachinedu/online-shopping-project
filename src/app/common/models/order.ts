import { CartItem } from "./cart-item";

export class Order {
    constructor(
        public id: string,
        public products: CartItem[],
        public date: string,
        public status: OrderStatus,
    ) { }
}

enum OrderStatus {
    NEW = 'New',
    PROCESSING = 'Processing',
    SHIPPED = 'Shipped',
    DELIVERED = 'Delivered',
    CANCELLED = 'Cancelled'
}