import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

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
}
