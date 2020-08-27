import { Module, DynamicModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({})
export class CoreModule {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static register(config): DynamicModule {
    return {
      module: ConfigModule,
      providers: [],
      imports: [
        AuthModule.register({ imports: config.imports, providers: config.providers }),
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      exports: [],
    };
  }
}
