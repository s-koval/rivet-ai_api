import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { ClientSchema } from '@/clients/dtos/client.dto';

const ClientListSchema = z.object({
  count: z.number(),
  data: ClientSchema,
});

export class ClientListSchemaDto extends createZodDto(ClientListSchema) {}
