import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestBody {
  @ApiProperty({ type: String })
  email: string = '';

  @ApiProperty({ type: String })
  password: string = '';

  @ApiProperty({ type: String })
  firstname: string = '';

  @ApiProperty({ type: String })
  lastname: string = '';

  @ApiProperty({ type: Date })
  dob?: Date | null;

  @ApiProperty({ type: String })
  gender: string = '';

  @ApiProperty({ type: Number })
  status: number = 0;

  @ApiProperty({ type: Boolean })
  active: boolean = false;
}
