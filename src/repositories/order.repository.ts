import * as AWS from 'aws-sdk';
import { CreateOrderDto } from '../modules/order/dto/createOrder.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

AWS.config.update({
    region: 'ap-southeast-1',
    accessKeyId: 'AKIA5BSYCRCGBFB4YIHE',
    secretAccessKey: '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',
});

let dynamoDB;

dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'ap-southeast-1',
    endpoint: 'dax.ap-southeast-1.amazonaws.com',
    convertEmptyValues: true,
});

export class OrderRepository {
    constructor() { }

    async createOrder(createOrderDto: CreateOrderDto) {

        console.log(createOrderDto)
        const newOrder = {
            id: uuid(),
            title: createOrderDto.title,
            category: createOrderDto.category,
            '123': createOrderDto[123],
            '1234': createOrderDto[1234],
        };

        try {
            await new AWS.DynamoDB.DocumentClient()
                .put({
                    TableName: 'order',
                    Item: newOrder,
                })
                .promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return { ok: true, data: newOrder };
    }

    async updateOrder(id, createOrderDto: CreateOrderDto) {

        const updateOrder = {
            title: createOrderDto.title,
            category: createOrderDto.category,
            '123': createOrderDto[123],
            '1234': createOrderDto[1234],
        };

        try {
            await new AWS.DynamoDB.DocumentClient()
                .update({
                    TableName: 'order',
                    Key: { id },
                    // Item: updateOrder,
                })
                .promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return { ok: true, data: updateOrder };
    }

    async getOrderById(id) {
        let order;
        try {
            const result = await new AWS.DynamoDB.DocumentClient()
                .get({
                    TableName: 'order',
                    Key: { "123": "123", "1234": "1234" },
                })
                .promise();

            order = result.Item;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!order) {
            throw new NotFoundException(`Order with ID "${id}" not found`);
        }

        return { ok: true, data: order };
    }

    async scanForResultsDdbDc() {
        try {
            var params = {
                TableName: 'order'
            };
            var result = await new AWS.DynamoDB.DocumentClient().scan(params).promise()
        } catch (error) {
            console.error(error);
        }

        return { ok: true, data: result };
    }

    async deleteOrderById(id) {
        let order;
        try {
            var result = await new AWS.DynamoDB.DocumentClient()
                .delete({
                    TableName: 'order',
                    Key: { "123": "1234", "1234": "12345" },
                })
                .promise();

        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!order) {
            throw new NotFoundException(`Order with ID "${id}" not found`);
        }

        return { ok: true, data: result };
    }

}
