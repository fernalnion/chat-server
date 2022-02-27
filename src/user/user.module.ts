import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserBusiness } from 'src/business';
import { UserSchema } from 'src/schemas/user.schema';
import { UserService } from './user.service';

const MONGOOSE_SCHEMA: any[] = [{ name: 'User', schema: UserSchema }];
const SERVICES: any[] = [UserService, UserBusiness];

@Module({
  imports: [MongooseModule.forFeature(MONGOOSE_SCHEMA)],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class UserModule {}
