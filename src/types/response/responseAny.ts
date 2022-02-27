import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IResponse } from '../response';

export class ResponseAny implements IResponse {
  @ApiPropertyOptional({ type: String })
  data?: any | null;

  @ApiProperty({ type: Boolean })
  error = false;

  @ApiPropertyOptional({ type: String })
  errormessage?: string | null;
}
