import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientCreateDto } from '@/clients/dtos/client-create.dto';
import { ClientEntity } from '@/clients/entities/client.entity';
import { Pagination } from '@/common/dtos/pagination.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientsRepository: Repository<ClientEntity>,
  ) {}

  public getAllWithPagination = async (
    take: number | undefined = 0,
    skip: number | undefined = 1,
  ): Promise<Pagination<ClientEntity[]>> => {
    const [data, count] = await this.clientsRepository.findAndCount({
      take,
      skip: take * (skip - 1),
    });
    return {
      count,
      data,
    };
  };

  public create = async (input: ClientCreateDto): Promise<string> => {
    const client = await this.clientsRepository.findOneBy({
      email: input.email,
    });
    if (client) {
      throw new HttpException(
        `Client with email "${client.email}" already exists`,
        400,
      );
    }
    const {
      identifiers: [{ id }],
    } = await this.clientsRepository.insert(input);
    return id;
  };

  public delete = async (id: string): Promise<void> => {
    const { affected } = await this.clientsRepository.delete(id);
    if (affected === 0) {
      throw new HttpException(`Cannot find client by id ${id}`, 404);
    }
  };
}
