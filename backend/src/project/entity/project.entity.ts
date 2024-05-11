import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { User } from '../../user/entitity/user.entity';
import { Task } from '../../task/entity/task.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Project {
  @ApiProperty({
    description: 'Primary key as Project ID',
    example: 'cf7d2d62-1d19-4aa3-86fe-9dcd9789a8d9',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Project Name',
    example: 'Hotel Management System',
  })
  @Column()
  project_name: string;

  @ApiProperty({
    description: 'Project Category',
    example: 'Revenue, Reservation, Booking',
  })
  @Column()
  category: string;

  @ApiProperty({
    description: 'Project Starting Date',
    example: '11/02/2024',
  })
  @Column()
  start_date: Date;

  @ApiProperty({
    description: 'Project Ending Date',
    example: '11/04/2024',
  })
  @Column()
  end_date: Date;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
  @Column({ nullable: true })
  upload_cover_image: string;

  // @OneToMany(() => Task, (task) => task.project)
  // tasks: Task[];

  @ManyToMany(() => User, (user) => user.projects)
  users: User[];
}
