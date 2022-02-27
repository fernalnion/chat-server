import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IResponse } from '../response';
import { ILoginToken } from '../token';

export class LoginToken implements ILoginToken {
  @ApiProperty()
  accessToken: string = '';
  @ApiProperty()
  refreshToken: string = '';
}

@ApiExtraModels(LoginToken)
export class LoginResponse implements IResponse {
  @ApiProperty({ type: () => LoginToken })
  data: LoginToken = new LoginToken();

  @ApiProperty({ type: Boolean })
  error = false;

  @ApiProperty({ type: String })
  errormessage?: string | null;
}
