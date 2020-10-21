import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './database.config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      inject: [],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
