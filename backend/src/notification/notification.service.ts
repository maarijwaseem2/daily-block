import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entity/notification.entity';
import { User } from '../user/entitity/user.entity';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>,
    ) {}

    async createUserVerificationNotification(user: User): Promise<Notification> {
        const message = `Hello, ${user.first_name +' '+ user.last_name}! Your account has been verified.`;
        const notification = this.notificationRepository.create({
            message,
            user,
            status: 'sent',
        });
        return this.notificationRepository.save(notification);
    }
}
