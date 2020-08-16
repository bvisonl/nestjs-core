import { EntityRepository, Repository } from 'typeorm';
import { AuthJwtRefreshToken } from './auth.jwt.refresh-token.entity';

@EntityRepository(AuthJwtRefreshToken)
export class AuthJwtRefreshTokenRepository extends Repository<AuthJwtRefreshToken> {}
