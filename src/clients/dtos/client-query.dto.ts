import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const ClientQuerySchema = z.object({
  perPage: z
    .preprocess(
      (input) => {
        const processed = z
          .string()
          .regex(/^\d+$/)
          .transform(Number)
          .safeParse(input);
        return processed.success ? processed.data : input;
      },
      z
        .number({
          invalid_type_error: 'Parameter "perPage" must be a number!',
        })
        .min(0),
    )
    .default(0),
  pageNo: z
    .preprocess(
      (input) => {
        const processed = z
          .string()
          .regex(/^\d+$/)
          .transform(Number)
          .safeParse(input);
        return processed.success ? processed.data : input;
      },
      z
        .number({
          invalid_type_error: 'Parameter "pageNo" must be a number!',
        })
        .min(1),
    )
    .default(1),
});

export class ClientQueryDto extends createZodDto(ClientQuerySchema) {}
