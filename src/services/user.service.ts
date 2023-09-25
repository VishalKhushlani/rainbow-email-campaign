import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUsersWithBirthdaysInDays(days: number): Promise<User[]> {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + days);

    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.dateOfBirth BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getMany();
  }

  isBirthdayWithinAWeek(dateOfBirth: Date): boolean {
    const currentDate = new Date();
    const upcomingBirthday = new Date(
      currentDate.getFullYear(),
      dateOfBirth.getMonth(),
      dateOfBirth.getDate(),
    );
    const differenceInDays =
      (upcomingBirthday.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);

    return differenceInDays >= 0 && differenceInDays <= 7;
  }

  async findUserById(userId: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }
  // ... other methods ...
}
