import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MailDataRequired,
  MailService as SendGridMailService,
} from '@sendgrid/mail';
import { MailTypeEnum } from '../enums/email.enum';

const mailTemplates: Record<MailTypeEnum, string> = {
  [MailTypeEnum.BIRTHDAY_DISCOUNT_CODES]: 'send-grid-template-uid',
};

@Injectable()
export class EmailService {
  private readonly logger = new Logger('mail-service');
  private readonly client = new SendGridMailService();
  private readonly maxRetryAttempts = 3;
  private readonly fromEmailAddress = 'campaign@rainbow.com';
  private readonly frontendDomain: string;
  private isEnabled = false;

  constructor(configService: ConfigService) {
    const sendGridAPIKey = configService.get('SENDGRID_API_KEY');
    this.frontendDomain = configService.get('FRONTEND_DOMAIN');
    if (sendGridAPIKey && sendGridAPIKey != 'null') {
      this.client.setApiKey(sendGridAPIKey);
      this.isEnabled = true;
    }
  }

  private async sendMail(data: MailDataRequired, retryAttempt = 1) {
    if (!this.isEnabled) {
      const mailType = Object.keys(mailTemplates).find(
        (key) => mailTemplates[key] === data.templateId,
      );
      this.logger.verbose(
        `Mail service disabled, but got '${mailType}' mail to '${data.to}'`,
        { mail: data },
      );
      return;
    }

    const [response] = await this.client.send(data);
    if (response.statusCode != 202) {
      if (retryAttempt < this.maxRetryAttempts)
        this.sendMail(data, retryAttempt + 1);
      else
        this.logger.warn(`Failed to send email to '${data.to}'`, { response });
    }
  }

  send(mailType: MailTypeEnum, to: string, data: object = {}) {
    if (this.isEnabled && !this.frontendDomain) {
      this.logger.error(`Domain is not defined`);
      return;
    }

    const templateId = mailTemplates[mailType];
    const dynamicTemplateData = { domain: this.frontendDomain, ...data };
    this.sendMail({
      from: this.fromEmailAddress,
      to,
      templateId,
      dynamicTemplateData,
    });
  }
}
