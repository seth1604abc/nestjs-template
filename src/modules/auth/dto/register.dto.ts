import { IsNotEmpty, IsString } from 'class-validator'

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    account: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    name: string
}
