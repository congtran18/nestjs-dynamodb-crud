import { CreateOrderDto } from '../modules/order/dto/createOrder.dto';
export declare class OrderRepository {
    constructor();
    createOrder(createOrderDto: CreateOrderDto): Promise<{
        ok: boolean;
        data: {
            id: any;
            title: string;
            category: string;
        };
    }>;
    getOrderById(id: any): Promise<{
        ok: boolean;
        data: any;
    }>;
}
