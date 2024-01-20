import { Controller, Get, UseGuards, Request, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiHeaders } from '@nestjs/swagger'
import { UserService } from './user.service'
import { JwtAuthGuard } from '@src/modules/auth/auth.gaurd'
import { JwtRequest } from '@src/common/dto/jwtRequest.dto'

@ApiTags('user')
@ApiBearerAuth('Bearer')
@ApiHeaders([{ name: 'Authorization' }])
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/')
    async getUserInfo(@Request() req: JwtRequest) {
        return {
            statusCode: HttpStatus.OK,
            message: '獲取成功',
            data: {
                ...req.user,
            },
        }
    }
}
