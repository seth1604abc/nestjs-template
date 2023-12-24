import { Request } from '@nestjs/common'

export interface JwtRequest extends Request {
    user: {
        userId: number
        userName: string
        companyId: number
    }
}
