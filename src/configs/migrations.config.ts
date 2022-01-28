import { ConfigModule } from "@nestjs/config";
import databaseConfig from "src/configs/database.config";

ConfigModule.forRoot({
    isGlobal: true,
    load: [databaseConfig]
});

export default {
    ...databaseConfig(),
    migrations: ['migrations/*.ts'],
    cli: {
        migrationsDir: 'migrations'
    }
};