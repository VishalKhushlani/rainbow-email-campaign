import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { SchedulerService } from '../services/scheduler.service';
import { CampaignService } from '../services/campaign.service';
import { EmailService } from '../services/email.service';
import { DiscountService } from '../services/discount.service';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Discount } from '../entities/discount.entity';
import { DiscountCodes } from '../entities/discount-code.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [Product, User, Order, OrderItem, Discount, DiscountCodes],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Product,
      User,
      Order,
      OrderItem,
      Discount,
      DiscountCodes,
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ProductService,
    UserService,
    SchedulerService,
    CampaignService,
    EmailService,
    DiscountService,
  ],
})
export class AppModule {}
