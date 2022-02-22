import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto, res: any): Promise<any>;
    getOrderById(id: string, res: any): Promise<any>;
}
