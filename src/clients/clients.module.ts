import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from '@/clients/clients.controller';
import { ClientsService } from '@/clients/clients.service';
import { ClientEntity } from '@/clients/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
