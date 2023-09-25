import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscountCodes } from '../entities/discount-code.entity';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(DiscountCodes)
    private readonly discountRepository: Repository<DiscountCodes>,
  ) {}

  // Generate a new discount code
  async generateCode(discountPercentage: number): Promise<DiscountCodes> {
    const discount = new DiscountCodes();
    discount.code = this.createUniqueCode(); // Generate a unique code
    discount.discount.discountPercentage = discountPercentage;
    discount.isRedeemed = false;
    return await this.discountRepository.save(discount);
  }

  // Validate a discount code
  async validateCode(code: string): Promise<DiscountCodes> {
    const discount = await this.discountRepository.findOne({ where: { code } });
    if (!discount || discount.isRedeemed) {
      throw new NotFoundException(
        `Invalid or already redeemed discount code: ${code}`,
      );
    }
    return discount;
  }

  // Redeem a discount code
  async redeemCode(code: string): Promise<void> {
    const discount = await this.validateCode(code);
    discount.isRedeemed = true;
    await this.discountRepository.save(discount);
  }

  // Helper method to generate a unique discount code
  private createUniqueCode(): string {
    // This is a simple example. In a real-world scenario, you might want to use a more complex algorithm.
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  async validateDiscountCode(code: string): Promise<DiscountCodes> {
    return this.validateCode(code);
  }
}
