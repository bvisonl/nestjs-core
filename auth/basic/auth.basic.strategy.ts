import * as bcrypt from 'bcryptjs';
import { BasicStrategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EmployeeService } from '../../../employee/employee.service';

@Injectable()
export class AuthBasicStrategy extends PassportStrategy(BasicStrategy) {
  constructor(private employeeService: EmployeeService) {
    super({ passReqToCallback: true }, async (req, username, password, verified) => {
      const employee = await this.employeeService.findByUsername(username);

      // Validate credentials
      if (!employee || !bcrypt.compareSync(password, employee.password)) {
        return false;
      }

      // Add the employee to the request
      req.user = employee;

      verified(null, employee);
    });
  }
}
