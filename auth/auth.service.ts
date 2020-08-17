import { Injectable } from '@nestjs/common';
import { EmployeeService } from 'src/modules/employee/employee.service';
import { CoreCredentialsEntity } from '../entities/core.credentials.entity';

@Injectable()
export class AuthService {
  constructor(private employeeService: EmployeeService) {}

  async findByUsername(username: string): Promise<CoreCredentialsEntity> {
    return await this.employeeService.findByUsername(username);
  }

  async findByApiKey(apiKey: string): Promise<CoreCredentialsEntity> {
    return await this.employeeService.findByApiKey(apiKey);
  }
}
