import { TestingModule, Test } from '@nestjs/testing'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { AuthService } from './auth.service'
import { UsersRepository } from '@src/repositories/users.repository'
import { CompanyRepository } from '@src/repositories/company.repository'
import { ConflictException, NotFoundException } from '@nestjs/common'

describe('AuthService', () => {
    let authService: AuthService
    let usersRepository: UsersRepository
    let companyRepository: CompanyRepository
    let mockBcryptHash: jest.Mock

    beforeEach(async () => {
        mockBcryptHash = jest.fn()

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule,
                ConfigModule.forFeature(async () => ({
                    HASH_SALT_ROUNDS: 10,
                })),
            ],
            providers: [
                AuthService,
                {
                    provide: UsersRepository,
                    useValue: {
                        findOneByAccount: jest.fn(),
                        createOne: jest.fn(),
                    },
                },
                {
                    provide: CompanyRepository,
                    useValue: {
                        findOneById: jest.fn(),
                    },
                },
                {
                    provide: 'bcrypt',
                    useValue: {
                        hash: mockBcryptHash,
                    },
                },
            ],
        }).compile()

        authService = module.get<AuthService>(AuthService)
        usersRepository = module.get<UsersRepository>(UsersRepository)
        companyRepository = module.get<CompanyRepository>(CompanyRepository)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('register', () => {
        it('Should create user success', async () => {
            const registerData = {
                account: 'test account',
                password: '123456',
                name: 'test name',
                companyId: 0,
            }

            usersRepository.findOneByAccount = jest.fn().mockResolvedValue(null)
            companyRepository.findOneById = jest.fn().mockResolvedValue({
                id: 1,
            })
            mockBcryptHash.mockResolvedValueOnce('hashPassword')
            usersRepository.createOne = jest.fn().mockResolvedValue({
                name: 'test name',
                account: 'test account',
                password: 'hashPassword',
                companyId: 0,
                id: 5,
            })

            const result = await authService.register(registerData)

            expect(result).toEqual({
                name: 'test name',
                account: 'test account',
                password: 'hashPassword',
                companyId: 0,
                id: 5,
            })
        })

        it('Duplicated account', async () => {
            const registerData = {
                account: 'test account',
                password: '123456',
                name: 'test name',
                companyId: 0,
            }

            usersRepository.findOneByAccount = jest.fn().mockResolvedValue({ id: 0 })

            await expect(authService.register(registerData)).rejects.toThrowError(ConflictException)
        })

        it('Company does not exist', async () => {
            const registerData = {
                account: 'test account',
                password: '123456',
                name: 'test name',
                companyId: 0,
            }

            usersRepository.findOneByAccount = jest.fn().mockResolvedValue(null)
            companyRepository.findOneById = jest.fn().mockResolvedValue(null)

            await expect(authService.register(registerData)).rejects.toThrowError(NotFoundException)
        })
    })
})
