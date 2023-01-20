import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventModule } from './events/event.module';
import configuration from './config/config';
import { SocketModule } from './websockets/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('db.url'),
          dbName: 'events-test',
        };
      },
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    EventModule,
    SocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
