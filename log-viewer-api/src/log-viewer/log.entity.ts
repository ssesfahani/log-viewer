import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  uuid: string;

  @Column('timestamp', { nullable: true })
  timestamp: Date;

  @Column({ nullable: true })
  httpMethod: string;

  @Column()
  fullText: string;

  @Column({ nullable: true })
  latency: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
