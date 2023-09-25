import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { ProductService } from './product.service';
import { DiscountService } from './discount.service';
import { DiscountCodes } from '../entities/discount-code.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly discountService: DiscountService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async checkActiveCampaignForUser(userId: number) {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const isBirthdayCampaignActive = this.userService.isBirthdayWithinAWeek(
      user.dateOfBirth,
    );
    let recommendedProducts = [];

    if (isBirthdayCampaignActive) {
      recommendedProducts =
        await this.productService.getMostOrderedProductsByUser(userId);
    }

    return {
      hasBirthdayCampaign: isBirthdayCampaignActive,
      recommendedProducts,
    };
  }

  async validateDiscountCode(code: string): Promise<DiscountCodes> {
    return await this.discountService.validateCode(code);
  }
}
