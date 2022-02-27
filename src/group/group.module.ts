import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { GroupBusiness, UserBusiness } from 'src/business';
import { GroupSchema } from 'src/models/group.schema';
import { TokenSchema } from 'src/models/token.schema';
import { UserSchema } from 'src/models/user.schema';
import { UserService } from 'src/user/user.service';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

const SERVICES: any[] = [
  AuthService,
  UserService,
  UserBusiness,
  GroupService,
  GroupBusiness,
];

const MONGOOSE_SCHEMA: any[] = [
  { name: 'Token', schema: TokenSchema },
  { name: 'User', schema: UserSchema },
  { name: 'Group', schema: GroupSchema },
];

@Module({
  imports: [MongooseModule.forFeature(MONGOOSE_SCHEMA)],
  controllers: [GroupController],
  providers: [...SERVICES],
})
export class GroupModule {}
