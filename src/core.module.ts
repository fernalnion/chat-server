import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  GroupBusiness,
  GroupUserBusiness,
  MessageBusiness,
  TokenBusiness,
  UserBusiness,
} from './business';
import { AccessTokenGuard, RefreshTokenGuard } from './guards/guards.service';
import { Group, GroupSchema } from './schemas';
import {
  GroupUser,
  GroupUserSchema,
  Message,
  MessageSchema,
  Token,
  TokenSchema,
  User,
  UserSchema,
} from './schemas/';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

const SERVICES: any[] = [
  AccessTokenGuard,
  RefreshTokenGuard,
  UserService,
  AuthService,
];

const BUSINESS: any[] = [
  UserBusiness,
  TokenBusiness,
  GroupBusiness,
  GroupUserBusiness,
  MessageBusiness,
];

const MONGOOSE_SCHEMA: any[] = [
  { name: User.name, schema: UserSchema },
  { name: Token.name, schema: TokenSchema },
  { name: Group.name, schema: GroupSchema },
  { name: GroupUser.name, schema: GroupUserSchema },
  { name: Message.name, schema: MessageSchema },
];

@Module({
  imports: [MongooseModule.forFeature(MONGOOSE_SCHEMA)],
  providers: [...SERVICES, ...BUSINESS],
  exports: [MongooseModule, ...SERVICES, ...BUSINESS],
})
export class CoreModule {}
