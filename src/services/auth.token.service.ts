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
  
  const fromAuthHeaderWithScheme = (BEARER_AUTH_SCHEME: string) => {
    const auth_scheme_lower = BEARER_AUTH_SCHEME.toLowerCase();
    return (request: Request) => {
      let token = null;
      if (request.headers[AUTH_HEADER]) {
        const auth_params = parseAuthHeader(request.headers[AUTH_HEADER] || '');
        if (
          auth_params &&
          auth_scheme_lower === auth_params.scheme.toLowerCase()
        ) {
          token = auth_params.value;
        }
      }
      return token;
    };
  };

export const fromExtractors = (extractors: any[]) => {
  if (!Array.isArray(extractors)) {
    throw new TypeError('extractors.fromExtractors expects an array');
  }
  return (request: Request) => {
    let token = null;
    let index = 0;
    while (!token && index < extractors.length) {
      token = extractors[index].call(this, request);
      index++;
    }
    return token;
  };
};

export const fromAuthHeaderAsBearerToken = (): any =>
  fromAuthHeaderWithScheme(BEARER_AUTH_SCHEME);

export const fromBodyField = (field_name: string): any => {
  return (request: Request) => {
    let token = null;
    if (
      request.body &&
      Object.prototype.hasOwnProperty.call(request.body, field_name)
    ) {
      token = request.body[field_name];
    }
    return token;
  };
};

export const fromUrlQueryParameter = (param_name: string): any => {
  return (request: Request) => {
    let token = null;
    const parsed_url = parse(request.url, true);
    if (
      parsed_url.query &&
      Object.prototype.hasOwnProperty.call(parsed_url.query, param_name)
    ) {
      token = parsed_url.query[param_name];
    }
    return token;
  };
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
