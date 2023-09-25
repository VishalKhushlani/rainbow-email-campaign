import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Discount } from './discount.entity';
import { User } from './user.entity';

@Entity('codes')
export class DiscountCodes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ default: false })
  isRedeemed: boolean;

  @ManyToOne(() => Discount, (discount) => discount.codes)
  discount: Discount;

  @ManyToOne(() => User, (user) => user.codes)
  user: User;

  // ... other fields ...
}
