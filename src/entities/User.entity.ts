import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Company } from './Company.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number

    @Column({ name: 'name', length: 20 })
    name: string

    @Column({ name: 'account', length: 16 })
    account: string

    @Column({ name: 'password', length: 255 })
    password: string

    @Column({ name: 'company_id' })
    companyId: number

    @ManyToOne(() => Company, (company) => company.users)
    @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
    companyU: Company
}
