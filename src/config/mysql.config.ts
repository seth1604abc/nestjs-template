import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

const mysqlConfigFactory = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
})

export default mysqlConfigFactory
