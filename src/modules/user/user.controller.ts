import { Body, Controller, Request, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from 'src/validators/loginUser';
import { RegisterUserDto } from 'src/validators/registerUser';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  register(@Body() dto: RegisterUserDto) {
    return this.userService.register(dto);
  }
  @Post('/log-in')
  login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto);
  }
  @Get('/all')
  allUsers(@Request() req: any) {
    return this.userService.allUsers(req.user);
  }
  @Get('/my-profile')
  profile(@Request() req: any) {
    return this.userService.profile(req.user);
  }
}
