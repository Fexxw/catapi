import {Module} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import databaseConfig from "./database.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().default(3000),
                POSTGRES_HOST: Joi.string().default('localhost'),
                POSTGRES_PORT: Joi.number().default(5432),
                POSTGRES_USER: Joi.string().default('postgres'),
                POSTGRES_PASSWORD: Joi.string().default('root'),
                POSTGRES_DB: Joi.string().default('catApi'),
                AWS_REGION: Joi.string().required(),
                AWS_ACCESS_KEY_ID: Joi.string().required(),
                AWS_SECRET_ACCESS_KEY: Joi.string().required(),
                AWS_PUBLIC_BUCKET_NAME: Joi.string().required()
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: false,
            },
            load: [databaseConfig]
    })]
})
export class ConfigurationModule {}