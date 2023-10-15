import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Payload } from './jwt.payload';
import { UserRepository } from 'src/user/user.repository';
import { ConfigService } from '@nestjs/config';
import { ERRORS } from 'src/common/utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly repository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const user = await this.repository.findById(payload.sub);

    if (user) {
      return user;
    }

    throw new HttpException(ERRORS.USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);
  }
}
