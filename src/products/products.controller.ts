import { Body, Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {

    constructor(
        private readonly productSerive: ProductsService,
        private readonly jwtService: JwtService
    ) {}

    @Get()
    public async listProduct(@Req() request: Request) {
        // const cookie = request.cookies?.jwt;
        // const data = await this.jwtService.verifyAsync(cookie);
        // if (!data) {
        //     throw new UnauthorizedException();
        // }
        return {
            result: this.productSerive.list()
        }
    }

    @Get(':id')
    public getProductById(@Param('id')id : String) {
        let product = this.productSerive.get(id)
        return { result: product || {} }
    }

    @Post()
    public async createProduct(
        @Body('title') title: String,
        @Body('price') price: Number,
        @Req() request: Request
    ): Promise<{ id: String }> {
        // const cookie = request.cookies['jwt'];
        // const data = await this.jwtService.verifyAsync(cookie);
        // if (!data) {
        //     throw new UnauthorizedException();
        // }

        let id = this.productSerive.create(title, price);
        return { id: id }
    }

    @Put(':id')
    public updateProduct(@Param('id') id: String, @Body('title') title: String, @Body('price') price: Number): any {
        let result = this.productSerive.update(id, title, price)
        return { result: result }
    }

    @Delete(':id')
    public deleteProduct(@Param('id') id: String) {
        let result = this.productSerive.delete(id)
        return { result: result }
    }
}