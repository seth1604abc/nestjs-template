import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@src/entities/User.entity'
import { RegisterDto } from '@src/modules/auth/dto/register.dto'

@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

    findOneByAccount(account: string) {
        return this.userRepo.findOne({
            where: {
                account,
            },
        })
    }

    createOne(data: RegisterDto) {
        const createEntity = this.userRepo.create({
            name: data.name,
            account: data.account,
            password: data.password,
        })

        return this.userRepo.save(createEntity)
    }
}
