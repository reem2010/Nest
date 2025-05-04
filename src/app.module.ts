import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticatedMiddleware } from './middlewares/authenticated';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const uri = configService.getOrThrow<string>('MONGO_URL');
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticatedMiddleware)
      .exclude(
        { path: '/users/sign-up', method: RequestMethod.POST },
        { path: '/users/log-in', method: RequestMethod.POST },
      )
      .forRoutes('/');
  }
}
