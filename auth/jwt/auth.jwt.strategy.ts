import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmployeeService } from 'src/modules/employee/employee.service';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, private employeeService: EmployeeService) {
    super(
      {
        passReqToCallback: true,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      },
      async (req, payload, verified) => {
        // Get the user
        const employee = await this.employeeService.findByUsername(payload.username);

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
