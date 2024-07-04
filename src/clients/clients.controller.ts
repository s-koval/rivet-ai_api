import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { ClientsService } from '@/clients/clients.service';
import { ClientListSchemaDto } from '@/clients/dtos/client-list.dto';
import { ClientCreateDto } from '@/clients/dtos/client-create.dto';
import { ClientQueryDto } from '@/clients/dtos/client-query.dto';
import { ClientParamDto } from '@/clients/dtos/client-param.dto';
import { ClientEntity } from '@/clients/entities/client.entity';
import {
  MessageResponse,
  MessageResponseDto,
} from '@/common/dtos/message-response.dto';
import { Pagination } from '@/common/dtos/pagination.dto';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Get all clients with optional pagination' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'An array of transactions with total count',
    type: ClientListSchemaDto,
    isArray: true,
  })
  @ApiQuery({ name: 'perPage', type: Number, required: false })
  @ApiQuery({ name: 'pageNo', type: Number, required: false })
  @Get()
  public async getAll(
    @Query() { perPage, pageNo }: ClientQueryDto,
  ): Promise<Pagination<ClientEntity[]>> {
    return await this.clientsService.getAllWithPagination(perPage, pageNo);
  }

  @ApiOperation({ summary: 'Create new client' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Message with id',
    type: MessageResponseDto,
  })
  @Post()
  public async create(@Body() body: ClientCreateDto): Promise<MessageResponse> {
    const id = await this.clientsService.create(body);
    return { message: `Client was successfully created`, id };
  }

  @ApiOperation({ summary: 'Delete client by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Client with id',
    type: MessageResponseDto,
  })
  @Delete(':id')
  public async delete(
    @Param() { id }: ClientParamDto,
  ): Promise<MessageResponse> {
    await this.clientsService.delete(id);
    return { message: `Client was successfully deleted`, id };
  }
}
