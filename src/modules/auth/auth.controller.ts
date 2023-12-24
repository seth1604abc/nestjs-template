import { Controller, Post, Body, ValidationPipe, HttpStatus } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { RegisterDto } from './dto/register.dto'
import { SigninDto } from './dto/signIn.dto'
import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body(new ValidationPipe()) data: RegisterDto) {
        try {
            const result = await this.authService.register(data)
            return {
                statusCode: HttpStatus.OK,
                message: '建立帳號成功',
                data: result,
            }
        } catch (err) {
            throw err
        }
    }

    @Post('sign-in')
    async signIn(@Body(new ValidationPipe()) data: SigninDto) {
        try {
            const token = await this.authService.signIn(data)
            return {
                statusCode: HttpStatus.OK,
                message: '登入成功',
                data: token,
            }
        } catch (err) {
            throw err
        }
    }
}
