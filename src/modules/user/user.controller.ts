import { Body, Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/services/auth.guard';
import { UserService } from 'src/services/user.service';
import { User } from 'src/types/user.type';

@ApiTags('Users')
@Controller('user')
@UseGuards(JWTAuthGuard)
@ApiBearerAuth('JWT')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('profile')
    getProfile(@Req() request): User {
        return request.user;
    }

    @Put('/:userid')
    updateUser(
        @Param('userid') userid: string,
        @Body() user: User,
    ) {
        return this.userService.updateUser(userid, user);
    }
}
