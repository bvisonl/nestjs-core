import { Strategy } from 'passport-localapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmployeeService } from '../../../employee/employee.service';

@Injectable()
export class AuthApiKeyStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, private employeeService: EmployeeService) {
    super({ passReqToCallback: true, apiKeyField: 'apiKey' }, async (req, apiKey, verified) => {
      // Get the user
      const employee = await this.employeeService.findByApiKey(apiKey);

      if (!employee) {
        return false;
      }

      // Assign the user to the request
      req.user = employee;

      verified(null, employee);
    });
  }
}
