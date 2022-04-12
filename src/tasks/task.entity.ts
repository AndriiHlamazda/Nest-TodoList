import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity()
export class Task {
    @PrimaryColumn()
    id: string;

    @Column()
    order: Date;

    @Column()
    title: string;

    @Column()
    isDone: boolean;

    @Column()
    mode: boolean;
}