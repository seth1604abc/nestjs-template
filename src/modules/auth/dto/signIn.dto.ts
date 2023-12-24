import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SigninDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: '帳號', type: String })
    account: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: '密碼', type: String })
    password: string
}
