import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { DiscountCodes } from '../entities/discount-code.entity';

@Controller('campaigns')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('check-active')
  async checkActiveCampaign(@Query('userId') userId: number) {
    return await this.appService.checkActiveCampaignForUser(userId);
  }

  @Get('validate')
  async validateDiscountCode(
    @Query('code') code: string,
  ): Promise<DiscountCodes> {
    return this.appService.validateDiscountCode(code);
  }
}
