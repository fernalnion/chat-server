import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { LoginToken as LoginTokenSchema } from 'src/schemas';
import { IResponse } from '../response';

export class LoginToken implements LoginTokenSchema {
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
