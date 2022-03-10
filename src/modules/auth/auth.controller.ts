import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserRequestBody } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() payload: UserRequestBody): Promise<any> {
    if (await this.authService.getUser(payload.username)) {
      throw new BadRequestException('Username already taken');
    }

    if (await this.authService.getUser(payload.email)) {
      throw new BadRequestException('Email already taken');
    }
    await this.authService.signUp(payload);

    return {
      data: true,
      error: false,
    };
  }
}
