import { Injectable, NotFoundException } from '@nestjs/common'
import { UsersRepository } from '@src/repositories/users.repository'

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UsersRepository) {}

    async getUserInfo(userId: number) {
        const user = await this.userRepo.findOneById(userId)
        if (!user) {
            throw new NotFoundException()
        }

        return user
    }
}
