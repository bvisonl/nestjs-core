import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as env from 'env-var';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: env
        .get('DB_HOST')
        .required()
        .asString(),
      port: env
        .get('DB_PORT')
        .required()
        .asPortNumber(),
      username: env
        .get('DB_USERNAME')
        .required()
        .asString(),
      password: env
        .get('DB_PASSWORD')
        .required()
        .asString(),
      database: env
        .get('DB_DATABASE')
        .required()
        .asString(),
      entities: [__dirname + '/**/*.entity{.ts,.js}', 'node_modules/nestjs-admin/**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: env
        .get('DB_SYNC')
        .default('false')
        .asBool(),
      dropSchema: env
        .get('DB_DROP')
        .default('false')
        .asBool(),
      logging: ['error'],
    };
  }
}
