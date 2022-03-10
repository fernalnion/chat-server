import { ApiProperty } from '@nestjs/swagger';
import { GENDER } from 'src/enums/gender.enum';
import { ROLE } from 'src/enums/role.enum';

export class UserRequestBody {
  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  firstname: string;

  @ApiProperty({ type: String })
  lastname?: string | undefined;

  @ApiProperty({ type: String })
  phone?: string | undefined;

  @ApiProperty({ type: Date })
  dob?: Date | undefined;

  @ApiProperty({ enum: GENDER })
  gender?: string | undefined;

  @ApiProperty({ type: Boolean, default: false })
  active: boolean;

  @ApiProperty({ enum: ROLE })
  role: number;
}
