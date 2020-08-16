import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import AuthJwtPayloadDto from './auth.jwt.payload.dto';
import { AuthJwtRefreshTokenRepository } from './auth..jwt.refresh-token.repository';
import AuthJwtTokenDto from './auth.jwt.token.dto';

@Injectable()
export class AuthJwtService {
  private readonly refreshOptions;
  private readonly accessOptions;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private authJwtRefreshTokenRepository: AuthJwtRefreshTokenRepository,
  ) {
    this.refreshOptions = {
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'),
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
    };

    this.accessOptions = {
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    };
  }

  async generateToken(payload: AuthJwtPayloadDto): Promise<AuthJwtTokenDto> {
    return {
      access_token_expires_in: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
      access_token: this.generateAccessToken(payload),
      refresh_token: await this.generateRefreshToken(payload),
      refresh_token_expires_in: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'),
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
