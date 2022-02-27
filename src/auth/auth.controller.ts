import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { USER_STATUS } from 'src/enum/userstatus';
import { AccessTokenGuard } from 'src/guards/guards.service';
import { LoginRequestBody } from 'src/types/loginRequestBody';
import { RegisterRequestBody } from 'src/types/registerRequestBody';
import { IResponse } from 'src/types/response';
import { ResponseAny } from 'src/types/response/responseAny';
import { LoginResponse, LoginToken } from 'src/types/response/responseLogin';
import { IUserLean } from 'src/types/user';
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
    const { id, user }: { id: string; user: IUserLean } =
      await this.userService.login(payload);
    const token = await this.authService.generateAuthToken({ ...user, id });
    return { user, token };
  }
}
