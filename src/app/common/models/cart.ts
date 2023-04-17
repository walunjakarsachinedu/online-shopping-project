export class Cart {
    constructor(
        public userId: string,
        public products: {id: string, quantity: number}[]
    ) { }
}