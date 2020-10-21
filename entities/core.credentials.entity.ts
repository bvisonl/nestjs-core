import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate } from 'typeorm';
import { CoreEntity } from './core.entity';
import { IsNotEmpty } from 'class-validator';

export class CoreCredentialsEntity extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true })
  resetPasswordTokenExpiration: Date;

  @Column({ nullable: true, unique: true })
  apiKey: string;

  @Column({ default: true })
  enabled: boolean;

  @Column({ nullable: true })
  lastUsed: Date;
}
