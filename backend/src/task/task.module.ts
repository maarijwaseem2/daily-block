import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/shared/strategy/jwt.strategy';
import { Project } from 'src/project/entity/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project]), JwtModule.register({})],
  providers: [TaskService, JwtService, JwtStrategy],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
