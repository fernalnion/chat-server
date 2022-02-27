import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/guards/guards.service';
import { UserBase } from 'src/schemas';
import { LoginRequestBody } from 'src/types/request/loginRequestBody';
import { RegisterRequestBody } from 'src/types/request/registerRequestBody';
import { IResponse } from 'src/types/response';
import { ResponseAny } from 'src/types/response/responseAny';
import { LoginResponse, LoginToken } from 'src/types/response/responseLogin';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(ResponseAny) },
  })
  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  @Get('/onlyauth')
  async hiddenInformation() {
    return <IResponse>{
      data: 'hidden Infromation',
      error: false,
    };
  }

  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(ResponseAny) },
  })
  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  @Get('/anyone')
  async publicInformation() {
    return <IResponse>{
      data: 'this can be seen by anyone',
      error: false,
    };
  }

  @Post('register')
  @ApiResponse({
    status: 200,
    description: 'user registered successfully',
    schema: { $ref: getSchemaPath(ResponseAny) },
  })
  @ApiResponse({
    status: 400,
    description: 'Error while registering user',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  async register(@Body() payload: RegisterRequestBody) {
    console.log(payload);
    await this.userService.create(payload);
    return <IResponse>{
      data: true,
      error: false,
    };
  }

  @Post('login')
  @ApiExtraModels(LoginToken)
  @ApiExtraModels(LoginResponse)
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(LoginResponse) },
  })
  @ApiResponse({
    status: 400,
    description: 'Error while login',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  async login(@Body() payload: LoginRequestBody) {
    const { id, user }: { id: string; user: UserBase } =
      await this.userService.login(payload);
    const token = await this.authService.generateAuthToken({
      ...user,
      id,
    });
    return { user, token };
  }
}
