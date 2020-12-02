import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserGroup } from './userGroup.entity';

@Entity()
export class Permissions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    groupId: number;

    @Column({
        default: false,
        nullable: false,
    })
    create: boolean;

    @Column({
        default: false,
        nullable: false,
    })
    edit: boolean;

    @Column({
        default: false,
        nullable: false,
    })
    delete: boolean;

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
