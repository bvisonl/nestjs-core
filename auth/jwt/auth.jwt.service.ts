import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import AuthJwtPayloadDto from './auth.jwt.payload.dto';
import { AuthJwtRefreshTokenRepository } from './auth..jwt.refresh-token.repository';
import AuthJwtTokenDto from './auth.jwt.token.dto';
import * as env from 'env-var';

@Injectable()
export class AuthJwtService {
  private readonly refreshOptions;
  private readonly accessOptions;

  constructor(private jwtService: JwtService, private authJwtRefreshTokenRepository: AuthJwtRefreshTokenRepository) {
    this.refreshOptions = {
      expiresIn: env
        .get('JWT_REFRESH_TOKEN_EXPIRATION')
        .required()
        .asString(),
      secret: env
        .get('JWT_REFRESH_TOKEN_SECRET')
        .required()
        .asString(),
    };

    this.accessOptions = {
      expiresIn: env
        .get('JWT_ACCESS_TOKEN_EXPIRATION')
        .required()
        .asString(),
      secret: env
        .get('JWT_ACCESS_TOKEN_SECRET')
        .required()
        .asString(),
    };
  }

  async generateToken(payload: AuthJwtPayloadDto): Promise<AuthJwtTokenDto> {
    return {
      access_token_expires_in: env
        .get('JWT_ACCESS_TOKEN_EXPIRATION')
        .required()
        .asString(),
      access_token: this.generateAccessToken(payload),
      refresh_token: await this.generateRefreshToken(payload),
      refresh_token_expires_in: env
        .get('JWT_REFRESH_TOKEN_EXPIRATION')
        .required()
        .asString(),
    };
  }

  generateAccessToken(payload: AuthJwtPayloadDto): string {
    return this.jwtService.sign(payload, this.accessOptions);
  }

  async generateRefreshToken(payload: AuthJwtPayloadDto): Promise<string> {
    const token = this.jwtService.sign(payload, this.refreshOptions);
    const verify = this.jwtService.verify(token, this.refreshOptions);

    // TODO: Control session based on User-Agent(?)
    const existingToken = await this.authJwtRefreshTokenRepository.findOne({
      where: {
        username: payload.username,
      },
    });

    if (existingToken) {
      verify.id = Number(existingToken.id);
    }
    verify.token = token;

    this.authJwtRefreshTokenRepository.save({ token: token, ...verify });

    return token;
  }

  async verifyRefreshToken(token: string): Promise<AuthJwtPayloadDto> {
    const verify = this.jwtService.verify(token, this.refreshOptions);

    const existingToken = await this.authJwtRefreshTokenRepository.findOne({
      where: {
        token: token,
      },
    });

    if (!existingToken) {
      return null;
    }

    return verify;
  }
}
