import { Controller, Get, UseGuards, Request } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from '@src/modules/auth/auth.gaurd'
import { JwtRequest } from '@src/common/dto/jwtRequest.dto'

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/')
    async getUserInfo(@Request() req: JwtRequest) {
        console.log(req.user)
    }
}
