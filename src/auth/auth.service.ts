import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;

    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const isPasswordValidated: Boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const payload = { email: email, sub: user.id, role: 'BASIC' };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
