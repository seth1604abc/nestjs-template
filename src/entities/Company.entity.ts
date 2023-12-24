import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { User } from './User.entity'

@Entity()
export class Company {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number

    @Column({ name: 'name', length: 20 })
    name: string

    @Column({ name: 'address', length: 255 })
    address: string

    @Column({ name: 'identify_id', length: 10 })
    identifyId: string

    @OneToMany(() => User, (user) => user.companyU)
    users: User[]
}
