import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserBusiness } from 'src/business';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/guards/guards.service';
import { TokenSchema } from 'src/models/token.schema';
import { UserSchema } from 'src/models/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const SERVICES: any[] = [
  UserBusiness,
  AccessTokenGuard,
  RefreshTokenGuard,
  UserService,
  AuthService,
];

const MONGOOSE_SCHEMA: any[] = [
  { name: 'User', schema: UserSchema },
  { name: 'Token', schema: TokenSchema },
];

@Module({
  imports: [MongooseModule.forFeature(MONGOOSE_SCHEMA)],
  providers: [...SERVICES],
  controllers: [AuthController],
  exports: [...SERVICES],
})
export class AuthModule {}
