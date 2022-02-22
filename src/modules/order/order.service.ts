import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderRepository } from '../../repositories/order.repository';

@Injectable()
export class OrderService {
    constructor(private orderRepository: OrderRepository) {}

    async createOrder(createOrderDto: CreateOrderDto) {
        const createdOffer = await this.orderRepository.createOrder(createOrderDto);
        return createdOffer;
    }

    async updateOrder(id ,createOrderDto: CreateOrderDto) {
        const updateOffer = await this.orderRepository.updateOrder(id, createOrderDto);
        return updateOffer;
    }

    async getOrderById(id) {
        const Order = await this.orderRepository.getOrderById(id);
        return Order;
    }

    async deleteOrderById(id) {
        const Order = await this.orderRepository.deleteOrderById(id);
        return Order;
    }

    async getAllOrder() {
        const Orders = await this.orderRepository.scanForResultsDdbDc();
        return Orders;
    }
}
