import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ProductsService } from './products.service';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('name') prodName: string,
    @Body('price') prodPrice: number,
    @Body('amount') prodAmount: number,
  ) {
    const generatedId = await this.productsService.insertProduct(
      prodName,
      prodPrice,
      prodAmount
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('name') prodName: string,
    @Body('price') prodPrice: number,
    @Body('amount') prodAmount: number,
  ) {
    await this.productsService.updateProduct(prodId, prodName, prodPrice, prodAmount);
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
      await this.productsService.deleteProduct(prodId);
      return null;
  }
}
