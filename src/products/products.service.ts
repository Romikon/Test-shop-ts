import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(name: string, price: number, amount: number) {
    const newProduct = new this.productModel({
      name,
      price,
      amount,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      amount: prod.amount,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      amount: product.amount,
    };
  }

  async updateProduct(
    productId: string,
    name: string,
    price: number,
    amount: number,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (name) {
      updatedProduct.name = name;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (amount) {
      updatedProduct.amount = amount;
    }
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({_id: prodId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
