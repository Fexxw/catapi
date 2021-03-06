import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
    return {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        autoLoadEntities: true,
        entities: ['dist/src/entities/*.entity.js']
    }
})