import { Body, Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/services/auth.guard';
import { UserService } from 'src/services/user.service';
import { User } from 'src/types/user.type';

@Controller('user')
@UseGuards(JWTAuthGuard)
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
