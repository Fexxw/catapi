import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from "./database/database.module";
import { ConfigurationModule } from './configs/config.module';

@Module({
    imports: [
        ConfigurationModule,
        DatabaseModule,
        CatsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
