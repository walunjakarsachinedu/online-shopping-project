export class Order {
    constructor(
        public id: string,
        public customerId: string,
        public products: string[],
        public orderDate: Date, 
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