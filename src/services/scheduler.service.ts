import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CampaignService } from './campaign.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private readonly campaignService: CampaignService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleBirthdayCampaign() {
    this.logger.debug('Started Birthday Campaign Scheduler');

    // Send birthday emails to users with birthdays 7 days from now
    await this.campaignService.sendBirthdayCampaignEmails();

    // Send reminder emails to users with birthdays 2-3 days from now
    await this.campaignService.sendBirthdayReminderEmails();

    this.logger.debug('Completed Birthday Campaign Scheduler');
  }
}
