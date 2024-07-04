import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const ClientCreateSchema = z.object({
  firstName: z.string({
    required_error: 'Property "firstName" is required',
    invalid_type_error: 'Property "firstName" must be a string!',
  }),
  lastName: z.string({
    required_error: 'Property "lastName" is required',
    invalid_type_error: 'Property "lastName" must be a string!',
  }),
  email: z.string({
    required_error: 'Property "email" is required',
    invalid_type_error: 'Property "email" must be a string!',
  }),
});

export class ClientCreateDto extends createZodDto(ClientCreateSchema) {}
