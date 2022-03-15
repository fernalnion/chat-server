import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginRequestBody, UserRequestBody } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';
import { LocalAuthGuard } from 'src/services/local-auth.guard';
import { TokenService } from 'src/services/token.service';
import { UserService } from 'src/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private tokenService: TokenService,
  ) {
  }

  @Post('/signup')
  async signUp(@Body() payload: UserRequestBody): Promise<any> {
    if (await this.userService.getUser(payload.username)) {
      throw new BadRequestException('Username already taken');
    }

    if (await this.userService.getUser(payload.email)) {
      throw new BadRequestException('Email already taken');
    }
    await this.authService.signUp(payload);

    return {
      data: true,
      error: false,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() payload: LoginRequestBody): Promise<any> {
    const user = await this.authService.validateUser(payload.useridentity, payload.password);
    const token = await this.tokenService.createAuthToken(user);
    return {
      data: token,
      error: false,
    };
  }
}
