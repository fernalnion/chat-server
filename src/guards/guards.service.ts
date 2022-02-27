import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import {
  fromAuthHeaderAsBearerToken,
  fromBodyField,
  fromExtractors,
  fromUrlQueryParameter,
  validateToken,
} from 'src/services/auth.token.service';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate = async (context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest();
    const token = fromExtractors([
      fromAuthHeaderAsBearerToken(),
      fromBodyField(`accesstoken`),
      fromUrlQueryParameter(`accesstoken`),
    ])(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    const payload = await validateToken(this.authService, token);
    request.user = payload;
    return true;
  };
}

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate = async (context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest();
    const token = fromExtractors([
      fromBodyField(`refreshtoken`),
      fromUrlQueryParameter(`refreshtoken`),
    ])(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const payload = await validateToken(this.authService, token);
    request.user = payload;
    return true;
  };
}
