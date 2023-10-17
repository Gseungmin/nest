import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { CreateUserDto } from './dto/user.create.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { User } from './entities/user.entity';
import { Response } from 'express';
import { PrivateInterceptor } from 'src/common/interceptor/private.interceptor';

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
  @UseInterceptors(PrivateInterceptor)
  async findUser(@CurrentUser() user: User) {
    return user;
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.save(userDto);
  }

  @Post('/login')
  async login(
    @Body() loginDto: LoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token } = await this.authService.login(loginDto);
    response.cookie('jwt', token, { httpOnly: true });
    return 'Login Success';
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteAll(@CurrentUser() user: User) {
    return this.userService.delete(user);
  }
}
