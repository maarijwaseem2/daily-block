import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../../task/entity/task.entity";
import { User } from "../../user/entitity/user.entity";

@Entity()
export class Notification {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    message: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timeStamp: Date;

    @Column()
    status: string

    @ManyToOne(() => Task, task => task.notifications)
    @JoinColumn({ name: 'task_id' })
    task: Task;

    @ManyToOne(() => User, user => user.notifications)
    @JoinColumn({ name: 'user_id' })
    user: User;

    // Foreign key
    @Column({ nullable: true })
    user_id: number; 

    // Foreign key
    @Column({ nullable: true })
    task_id: number; 
}