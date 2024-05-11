import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entitity/user.entity';
import { NotificationService } from 'src/notification/notification.service';
import { Notification } from 'src/notification/entity/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Notification])
  ],
  controllers: [UserController],
  providers: [UserService, NotificationService],
  exports: [UserService],
})
export class UserModule {}
