import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { response } from 'express';
import { Observable, tap } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('API-Gateway');
  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const req = context.switchToHttp().getRequest();
    const { method, originalUrl, ip, body, headers } = req;
    const now = Date.now();
    this.logger.log(
      `Próxima Request: ${method} ${originalUrl} - IP: ${ip} - Body: ${body ? JSON.stringify(body) : null}`,
    );
    return next.handle().pipe(
      tap({
        next: () => {
          const res = context.switchToHttp().getResponse();
          const code = res.statusCode;
          const duration = Date.now() - now;
          this.logger.log(
            `Response: ${method} ${originalUrl} - Status: ${code} - Duration: ${duration}ms`,
          );
        },
        error: (error) => {
          this.logger.error(
            `Error on: ${method} ${originalUrl} - Message: ${error.message}`,
          );
        },
      }),
    );
  }
}
