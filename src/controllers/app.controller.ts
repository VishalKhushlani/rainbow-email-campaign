import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { DiscountCodes } from '../entities/discount-code.entity';
import { CampaignService } from '../services/campaign.service';
import { DiscountService } from '../services/discount.service';

@Controller('campaigns')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly campaignService: CampaignService,
    private readonly discountService: DiscountService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('check-active')
  async checkActiveCampaign(@Query('userId') userId: number) {
    return await this.campaignService.checkActiveCampaignForUser(userId);
  }

  @Get('validate')
  async validateDiscountCode(
    @Query('code') code: string,
  ): Promise<DiscountCodes> {
    return this.discountService.validateDiscountCode(code);
  }
}
