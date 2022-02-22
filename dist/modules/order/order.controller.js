"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const createOrder_dto_1 = require("./dto/createOrder.dto");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    createOrder(createOrderDto, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newOrder = yield this.orderService.createOrder(createOrderDto);
                if (newOrder.ok) {
                    return res.status(common_1.HttpStatus.CREATED).json({
                        ok: true,
                        data: newOrder.data,
                    });
                }
                else {
                    return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                        ok: false,
                        message: 'Error Trying to Create Order',
                    });
                }
            }
            catch (error) {
                return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    ok: false,
                    message: 'Error Trying to reach DB',
                    errors: error,
                });
            }
        });
    }
    getOrderById(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.orderService.getOrderById(id);
                if (order.ok) {
                    return res.status(common_1.HttpStatus.OK).json({
                        ok: true,
                        order: order.data,
                    });
                }
                else {
                    return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                        ok: false,
                        message: 'Error Trying to Get Order',
                    });
                }
            }
            catch (error) {
                return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    ok: false,
                    message: 'Error Trying to reach DB',
                    errors: error,
                });
            }
        });
    }
};
__decorate([
    common_1.Post('/createOrder'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createOrder_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    common_1.Get('/getOrderById/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderById", null);
OrderController = __decorate([
    common_1.Controller('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map