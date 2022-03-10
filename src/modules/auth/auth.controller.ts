import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { LoginRequestBody, UserRequestBody } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';
import { compare, hash } from 'bcrypt';
import { TokenService } from 'src/services/token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

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

  @Post('/login')
  async login(@Body() payload: LoginRequestBody): Promise<any> {
    const user = await this.authService.getUser(payload.useridentity);
    if (!user) {
      throw new BadRequestException('Username/Email not registered with us');
    }

    const valid = await compare(payload.password, user.password);
    if (!valid) {
      throw new BadRequestException('Invalid user details');
    }

    if (!user.active) {
      throw new BadRequestException(
        'Account has been disabled, Contact your administrator',
      );
    }

    const token = await this.tokenService.createAuthToken(user);
    return {
      data: token,
      error: false,
    };
  }
}
