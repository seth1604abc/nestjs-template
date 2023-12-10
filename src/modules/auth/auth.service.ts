import { Injectable, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { GenerateJwtokenDto } from './dto/jwt.dto'
import { RegisterDto } from './dto/register.dto'
import { UsersRepository } from '@src/repositories/users.repository'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepo: UsersRepository,
        private readonly configService: ConfigService,
    ) {}

    async generateJwtoken(data: GenerateJwtokenDto) {
        const payload = {
            sub: data.userUid,
            userName: data.userName,
            companyId: data.companyId,
        }

        return this.jwtService.sign(payload)
    }

    async register(data: RegisterDto) {
        // 檢查帳號是否重複
        const user = await this.userRepo.findOneByAccount(data.account)
        if (user) {
            throw new ConflictException('Account is exist')
        }

        // hash 密碼
        const saltRounds = Number(this.configService.get<number>('HASH_SALT_ROUNDS'))
        const salt = await bcrypt.genSalt(saltRounds)
        const hashPassword = await bcrypt.hash(data.password, salt)

        const insertUser = await this.userRepo.createOne({
            name: data.name,
            account: data.password,
            password: hashPassword,
        })

        return insertUser
    }
}
