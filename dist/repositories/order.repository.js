"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const AWS = require("aws-sdk");
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
class OrderRepository {
    constructor() { }
    createOrder(createOrderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOrder = {
                id: uuid_1.v4(),
                title: createOrderDto.title,
                category: createOrderDto.category,
            };
            try {
                yield new AWS.DynamoDB.DocumentClient()
                    .put({
                    TableName: process.env.ORDERS_TABLE_NAME,
                    Item: newOrder,
                })
                    .promise();
            }
            catch (error) {
                throw new common_1.InternalServerErrorException(error);
            }
            return { ok: true, data: newOrder };
        });
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let order;
            try {
                const result = yield new AWS.DynamoDB.DocumentClient()
                    .get({
                    TableName: process.env.ORDERS_TABLE_NAME,
                    Key: { id },
                })
                    .promise();
                order = result.Item;
            }
            catch (error) {
                throw new common_1.InternalServerErrorException(error);
            }
            if (!order) {
                throw new common_1.NotFoundException(`Order with ID "${id}" not found`);
            }
            return { ok: true, data: order };
        });
    }
}
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=order.repository.js.map