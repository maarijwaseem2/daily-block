import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Project } from '../../project/entity/project.entity';
import { Notification } from '../../notification/entity/notification.entity';
import { Task } from '../../task/entity/task.entity';
import { UserRole } from '../userRole.enum';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class User {
  @ApiProperty({
    description: 'Primary key as User ID',
    example: 'cf7d2d62-1d19-4aa3-86fe-9dcd9789a8d9',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'First name of the User',
    example: 'maarij',
  })
  @Column()
  first_name: string;

  @ApiProperty({
    description: 'Last name of the User',
    example: 'waseem',
  })
  @Column()
  last_name: string;

  @ApiProperty({
    description: 'Email address of the User',
    example: 'maarij@gmail.com',
  })
  @Column()
  email: string;

  @Column()
  password: string;

  @ApiProperty({ enum: ['admin', 'user'] })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole;

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable()
  projects: Project[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
