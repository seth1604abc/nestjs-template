import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'

import { User } from '@src/entities/User.entity'
import { Company } from '@src/entities/Company.entity'

import { UsersRepository } from '@src/repositories/users.repository'
import { CompanyRepository } from '@src/repositories/company.repository'

import { JwtStrategy } from '@src/modules/auth/jwt.strategy'

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Company]),
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, UsersRepository, CompanyRepository, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
