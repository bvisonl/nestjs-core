import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AuthJwtRefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  username: string;

  @Column()
  sub: string;

  @Column()
  iat: number;

  @Column()
  exp: number;
}
