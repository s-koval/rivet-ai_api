import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZodValidationPipe } from 'nestjs-zod';
import { configsService } from '@/configs/configs.service';
import { ClientsModule } from '@/clients/clients.module';
import { LoggerMiddleware } from '@/common/middlewares/logger.middleware';
import { DatabaseLogger } from '@/common/logger/database.logger';

@Module({
  imports: [
    ClientsModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...configsService.getTypeOrmConfig(),
        logger: new DatabaseLogger(),
      }),
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
