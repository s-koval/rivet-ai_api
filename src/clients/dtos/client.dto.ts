import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const ClientSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
});

export class ClientDto extends createZodDto(ClientSchema) {}
