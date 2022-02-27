import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestBody {
  @ApiProperty({ type: String })
  email: string = '';

  @ApiProperty({ type: String })
  password: string = '';
}
