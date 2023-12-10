import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    ConflictException,
    HttpStatus,
} from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body(new ValidationPipe()) data: RegisterDto) {
        console.log(data)
        try {
            const result = await this.authService.register(data)
            return {
                statusCode: HttpStatus.OK,
                message: '建立帳號成功',
                data: result,
            }
        } catch (err) {
            if (err instanceof ConflictException) {
                return {
                    statusCode: HttpStatus.CONFLICT,
                    message: '帳號已存在',
                }
            }
            throw err
        }
    }

    @Post()
    async signIn() {}
}
