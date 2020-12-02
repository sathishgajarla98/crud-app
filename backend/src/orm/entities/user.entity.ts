import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { UserGroup } from './userGroup.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    firstName: string;

    @Column({
        nullable: false,
    })
    lastName: string;

    @Column({
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({
        default: true,
        nullable: false,
    })
    isActive: boolean;

    @Column({
        nullable: false,
    })
    public groupId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => UserGroup, {
        eager: true,
    })
    @JoinColumn({ name: 'groupId' })
    public group: UserGroup;
}
