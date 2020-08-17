import { Strategy } from 'passport-localapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthApiKeyStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true, apiKeyField: 'apiKey' }, async (req, apiKey, verified) => {
      const user = this.authService.findByApiKey(apiKey);

      // Check if the user was found
      if (!user) {
        return false;
      }

      // Assign the user to the request
      req.user = user;

      verified(null, user);
    });
  }
}
