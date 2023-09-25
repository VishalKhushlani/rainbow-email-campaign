import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { ProductService } from './product.service';
import { DiscountService } from './discount.service';
import { EmailService } from './email.service';
import { MailTypeEnum } from '../enums/email.enum';

@Injectable()
export class CampaignService {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly discountService: DiscountService,
    private readonly mailService: EmailService,
  ) {}

  async sendBirthdayCampaignEmails(): Promise<void> {
    // Fetch users with birthdays in the recent week
    const usersWithBirthdays =
      await this.userService.findUsersWithBirthdaysInDays(7);

    for (const user of usersWithBirthdays) {
      // Generate a discount code for the user
      const discount = await this.discountService.generateCode(10); // e.g., 10% discount

      // Fetch recommended products for the user
      const recommendedProducts =
        await this.productService.getMostOrderedProductsByUser(user.id);

      // Compile email data
      const emailData = {
        userName: user.name,
        discountCode: discount.code,
        recommendedProducts,
      };

      // Send the birthday email
      this.mailService.send(
        MailTypeEnum.BIRTHDAY_DISCOUNT_CODES,
        user.email,
        emailData,
      );
    }
  }

  async sendBirthdayReminderEmails(): Promise<void> {
    const usersWithBirthdaysIn2Days =
      await this.userService.findUsersWithBirthdaysInDays(2);
    const usersWithBirthdaysIn3Days =
      await this.userService.findUsersWithBirthdaysInDays(3);
    const reminderUsers = [
      ...usersWithBirthdaysIn2Days,
      ...usersWithBirthdaysIn3Days,
    ];

    for (const user of reminderUsers) {
      // Compile reminder email data (you can customize this further)
      const emailData = {
        userName: user.name,
        reminderMessage: "Don't forget to use your birthday discount code!",
      };

      // Send the birthday reminder email
      this.mailService.send(
        MailTypeEnum.BIRTHDAY_DISCOUNT_CODES,
        user.email,
        emailData,
      );
    }
  }
}
