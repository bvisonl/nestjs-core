import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { CoreCredentialsEntity } from '../entities/core.credentials.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async findByUsername(username: string): Promise<CoreCredentialsEntity> {
    return await this.userService.findByUsername(username);
  }

  async findByApiKey(apiKey: string): Promise<CoreCredentialsEntity> {
    return await this.userService.findByApiKey(apiKey);
  }
}
