import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Fetch all products
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // Fetch a product by ID
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Create a new product
  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  // Update a product
  async update(id: number, productData: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, productData);
    return this.findOne(id);
  }

  // Delete a product
  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  // Fetch recommended products for a user (placeholder logic)
  async getMostOrderedProductsByUser(userId: number): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .innerJoin('product.orderItems', 'orderItem')
      .innerJoin('orderItem.order', 'order')
      .where('order.user.id = :userId', { userId })
      .select(['product.id', 'product.name'])
      .addSelect('SUM(orderItem.quantity)', 'totalOrdered')
      .groupBy('product.id')
      .orderBy('totalOrdered', 'DESC')
      .getMany();
  }
}
