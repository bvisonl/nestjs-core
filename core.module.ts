import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, DatabaseModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}
