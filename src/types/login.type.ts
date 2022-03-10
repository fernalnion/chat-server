import { ApiProperty } from '@nestjs/swagger';

export class Login {
  @ApiProperty({ type: String })
  useridentity: string;

  @ApiProperty({ type: String })
  password: string;
}
