import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class ResourceAlreadyExistsFilter implements ExceptionFilter {
  catch(exception: { code: string }, host: ArgumentsHost) {
    if (exception.code && exception.code != '23505') {
      throw exception;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = 400;

    response.status(status).json({
      statusCode: status,
      message: 'This resource already exists.',
    });
  }
}
