import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { UserController } from './user.controller'

import { UsersRepository } from '@src/repositories/users.repository'
import { User } from '@src/entities/User.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, UsersRepository],
})
export class UserModule {}
