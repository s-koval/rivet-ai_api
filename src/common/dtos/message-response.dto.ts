import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export interface MessageResponse {
  message: string;
  id: string;
}

const MessageResponseSchema: z.ZodSchema<MessageResponse> = z.object({
  message: z.string(),
  id: z.string(),
});

export class MessageResponseDto extends createZodDto(MessageResponseSchema) {}
