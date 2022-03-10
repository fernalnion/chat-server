import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Token, TokenSchema } from 'src/types/token.type';
import { User, UserSchema } from 'src/types/user.type';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { Config } from 'src/config';
import { AuthStrategy } from './auth.strategy';
import { JWTAuthGuard } from './auth.guard';

const MONGOSE: any[] = [
  { name: User.name, schema: UserSchema },
  { name: Token.name, schema: TokenSchema },
];
@Module({
  imports: [
    MongooseModule.forFeature(MONGOSE),
    PassportModule,
    JwtModule.register({
      secret: Config.CHAT_SERVER_JWT_SECRET,
      signOptions: { expiresIn: `${Config.CHAT_SERVER_JWT_EXPIRE_IN_MINUTE}m` },
    }),
  ],
  providers: [AuthService, TokenService, AuthStrategy, JWTAuthGuard],
  exports: [
    MongooseModule,
    AuthService,
    TokenService,
    AuthStrategy,
    JWTAuthGuard,
  ],
})
export class ServiceModule {}
