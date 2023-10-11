import { CreateUserDto } from './dto/user.create.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.save(userDto);
  }
}
