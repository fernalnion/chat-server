import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { parse } from 'url';

const AUTH_HEADER = 'authorization';
const BEARER_AUTH_SCHEME = 'bearer';

const parseAuthHeader = (hdrValue: any) => {
  if (typeof hdrValue !== 'string') {
    return null;
  }
  const re = /(\S+)\s+(\S+)/;
  const matches = hdrValue.match(re);
  return matches && { scheme: matches[1], value: matches[2] };
};

export const fromAuthHeaderAsBearerToken = (request: Request): any => {
  const auth_scheme_lower = BEARER_AUTH_SCHEME.toLowerCase();
  let token = null;
  if (request.headers[AUTH_HEADER]) {
    const auth_params = parseAuthHeader(request.headers[AUTH_HEADER] || '');
    if (auth_params && auth_scheme_lower === auth_params.scheme.toLowerCase()) {
      token = auth_params.value;
    }
  }
  return token;
};

export const validateToken = async (
  authService: AuthService,
  token: string,
) => {
  const tokenpayload: any | null = await authService.verifyToken(token);
  if (tokenpayload) {
    return { ...tokenpayload };
  }
  throw new UnauthorizedException();
};
