export class Order {
    id?: number;
    user_id: number;
    cart_id: number;
    totalPrice: number;
    toCity: string;
    toStreet: string;
    orderDate: Date;
    card: number;
    createdAt: Date;
    updatedAt: Date;
}