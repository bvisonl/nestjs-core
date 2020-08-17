import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmployeeService } from 'src/modules/employee/employee.service';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private configService: ConfigService) {
    super(
      {
        passReqToCallback: true,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      },
      async (req, payload, verified) => {
        // Get the user
        const employee = await this.authService.findByUsername(payload.username);

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
