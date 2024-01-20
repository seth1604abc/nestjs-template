import {
    Injectable,
    ConflictException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { GenerateJwtokenDto } from './dto/jwt.dto'
import { RegisterDto } from './dto/register.dto'
import { SigninDto } from './dto/signIn.dto'
import { UsersRepository } from '@src/repositories/users.repository'
import { CompanyRepository } from '@src/repositories/company.repository'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepo: UsersRepository,
        private readonly companyRepo: CompanyRepository,
        private readonly configService: ConfigService,
    ) {}

    generateJwtoken(data: GenerateJwtokenDto) {
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
            throw new ConflictException('Account already exists')
        }

        // 檢查是否有公司
        const company = await this.companyRepo.findOneById(data.companyId)
        if (!company) {
            throw new NotFoundException('Company not found')
        }

        // hash 密碼
        const saltRounds = Number(this.configService.get<number>('HASH_SALT_ROUNDS'))
        const salt = await bcrypt.genSalt(saltRounds)
        const hashPassword = await bcrypt.hash(data.password, salt)

        const insertUser = await this.userRepo.createOne({
            name: data.name,
            account: data.account,
            password: hashPassword,
            companyId: data.companyId,
        })

        return insertUser
    }

    async signIn(data: SigninDto) {
        // 先尋找是否有帳號
        const user = await this.userRepo.findOneByAccount(data.account)
        if (!user) {
            throw new NotFoundException('Account does not exist')
        }

        const verifyUser = await bcrypt.compare(data.password, user.password)
        if (!verifyUser) {
            throw new UnauthorizedException('Password error')
        }

        const token = this.generateJwtoken({
            userName: user.name,
            userUid: user.id,
            companyId: user.companyU.id,
        })

        return token
    }
}
