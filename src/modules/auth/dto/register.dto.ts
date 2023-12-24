import { IsNotEmpty, IsString, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: '帳號', type: String })
    account: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: '密碼', type: String })
    password: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: '姓名', type: String })
    name: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: '公司ID', type: Number })
    companyId: number
}
