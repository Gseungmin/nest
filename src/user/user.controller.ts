import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { CreateUserDto } from './dto/user.create.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.save(userDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginRequestDto) {
    return this.authService.jwtLogin(loginDto);
  }
}
