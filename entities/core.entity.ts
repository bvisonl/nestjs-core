import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CoreEntity {
  @CreateDateColumn({ name: 'created_at', precision: 3 })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', precision: 3 })
  readonly updatedAt?: Date;
}
