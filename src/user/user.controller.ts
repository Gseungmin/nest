import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { CreateUserDto } from './dto/user.create.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/list')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findUser(@CurrentUser() user) {
    return user;
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
