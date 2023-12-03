import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@src/entities/User.entity'

@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(User) userRepo: Repository<User>) {}
}
