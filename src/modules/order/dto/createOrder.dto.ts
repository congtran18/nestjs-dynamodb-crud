import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    123: string;

    @IsNotEmpty()
    1234: string;
}
