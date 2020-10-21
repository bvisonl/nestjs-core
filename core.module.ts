import { Module, DynamicModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { IsUniqueValidator } from './validators/core.is-unique.validator';
import { ResourceInUseFilter } from './exceptions/core.resource-in-use-exception.filter';

@Module({})
export class CoreModule {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static register(config): DynamicModule {
    return {
      module: ConfigModule,
      providers: [IsUniqueValidator, ResourceInUseFilter],
      imports: [
        AuthModule.register({ imports: config.imports, providers: config.providers }),
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      exports: [],
    };
  }
}
