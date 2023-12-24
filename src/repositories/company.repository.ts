import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Company } from '@src/entities/Company.entity'

@Injectable()
export class CompanyRepository {
    constructor(@InjectRepository(Company) private readonly companyRepo: Repository<Company>) {}

    findOneById(id: number) {
        return this.companyRepo.findOne({
            where: {
                id: id,
            },
        })
    }
}
