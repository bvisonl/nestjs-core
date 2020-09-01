import * as bcrypt from 'bcryptjs';
import { BasicStrategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthBasicStrategy extends PassportStrategy(BasicStrategy) {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true }, async (req, username, password, verified) => {
      const user = await this.authService.findByUsername(req, username);

      // Validate credentials
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return false;
      }

      // Add the employee to the request
      req.user = user;

      verified(null, user);
    });
  }
}
