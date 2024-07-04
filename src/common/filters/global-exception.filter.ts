import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ZodValidationException } from 'nestjs-zod';
import { ZodError } from 'nestjs-zod/z';
import { AxiosError } from 'axios';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private logger = new Logger('Exception');

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = (exception as HttpException).message;
    let code = 'Http Exception';

    switch (exception.constructor) {
      case HttpException:
        statusCode = (exception as HttpException).getStatus();
        break;
      case NotFoundException:
        statusCode = (exception as HttpException).getStatus();
        message = 'Not Found';
        break;
      case QueryFailedError:
        statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as QueryFailedError).message;
        code = (exception as any).code;
        break;
      case ZodValidationException:
        const error = (exception as ZodValidationException).getResponse();

        code = 'Validation Exception';
        statusCode = HttpStatus.BAD_REQUEST;
        message = (error as ZodError).errors[0].message;
        break;
      case AxiosError:
        code = 'Axios Error';
        statusCode = HttpStatus.BAD_REQUEST;
        message = (exception as AxiosError).message;
      default:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    if (statusCode >= 500) {
      this.logger.error(message);
    } else if (statusCode >= 400) {
      this.logger.warn(message);
    } else {
      this.logger.log(message);
    }

    response.status(statusCode).json({
      statusCode,
      message,
      code,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    });
  }
}
