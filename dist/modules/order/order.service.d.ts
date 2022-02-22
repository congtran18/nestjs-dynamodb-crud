import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderRepository } from '../../repositories/order.repository';
export declare class OrderService {
    private orderRepository;
    constructor(orderRepository: OrderRepository);
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
