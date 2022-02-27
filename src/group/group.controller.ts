import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/guards/guards.service';
import { IResponse } from 'src/types/response';
import { ResponseAny } from 'src/types/response/responseAny';

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor() {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(ResponseAny) },
  })
  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  @Get('')
  async hiddenInformation() {
    return <IResponse>{
      data: 'my group',
      error: false,
    };
  }
}
