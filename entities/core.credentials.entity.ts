import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CoreEntity } from './core.entity';

@Entity()
export class CoreCredentialsEntity extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  apiKey: string;

  @Column()
  enabled: boolean;
}
