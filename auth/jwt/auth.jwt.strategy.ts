import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { AuthService } from '../auth.service';
import * as env from 'env-var';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
      {
        passReqToCallback: true,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: env
          .get('JWT_ACCESS_TOKEN_SECRET')
          .required()
          .asString(),
      },
      async (req, payload, verified) => {
        // Get the user
        const employee = await this.authService.findByUsername(req, payload.username);

        // Check if exists
        if (!employee) {
          return false;
        }

        // Assign the user to the request
        req.user = employee;

        verified(null, employee);
      },
    );
  }
}
