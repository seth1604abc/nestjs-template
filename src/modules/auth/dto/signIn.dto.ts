import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SigninDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: '帳號', type: String, example: 'eric@gmail.com' })
    account: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: '密碼', type: String, example: '123456' })
    password: string
}
