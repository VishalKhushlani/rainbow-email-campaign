import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DiscountCodes } from './discount-code.entity';

@Entity('discounts')
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('decimal')
  discountPercentage: number;

  @OneToMany(() => DiscountCodes, (code) => code.discount)
  codes: DiscountCodes[];

  // ... other fields ...
}
