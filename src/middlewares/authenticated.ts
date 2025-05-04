import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticatedMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers['authorization'];

    if (!bearerToken) {
      throw new UnauthorizedException();
    }

    const [_bearer, token] = bearerToken.split(' ');

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const email = jwt.verify(
        token,
        this.configService.getOrThrow<string>('SECRET'),
      );

      req['user'] = email;
    } catch (error) {
      throw new UnauthorizedException();
    }

    next();
  }
}
