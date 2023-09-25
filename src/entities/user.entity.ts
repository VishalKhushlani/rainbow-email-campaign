import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DiscountCodes } from './discount-code.entity';
import { Order } from './order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  dateOfBirth: Date;

  @OneToMany(() => DiscountCodes, (code) => code.user)
  codes: DiscountCodes[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
  // ... other fields ...
}
