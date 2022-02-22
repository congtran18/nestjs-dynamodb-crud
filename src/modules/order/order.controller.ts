import { Controller, Post, Body, Res, Delete, HttpStatus, Get, Req, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Post('/createOrder')
    async createOrder(@Body() createOrderDto: CreateOrderDto, @Res() res: any) {
        try {
            const newOrder: any = await this.orderService.createOrder(createOrderDto);
            if (newOrder.ok) {
                return res.status(HttpStatus.CREATED).json({
                    ok: true,
                    data: newOrder.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Create Order',
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }

    @Get('/getOrderById/:id')
    async getOrderById(@Param('id') id: string, @Res() res: any) {
        console.log(id)
        try {
            const order: any = await this.orderService.getOrderById(id);
            if (order.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    order: order.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Order',
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }

    @Get('/getOrders')
    async getOrders(@Res() res: any) {
        try {
            const orders: any = await this.orderService.getAllOrder();
            if (orders.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    order: orders.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Order',
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }

    @Delete('/deleteOrderById/:id')
    async deleteOrderById(@Param('id') id: string, @Res() res: any) {
        try {
            const order: any = await this.orderService.deleteOrderById(id);
            if (order.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    order: order.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Order',
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
}
