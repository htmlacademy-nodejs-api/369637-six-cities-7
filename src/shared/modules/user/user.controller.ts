import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { HttpMethod } from '../../types/http-method.enum.js';
import { BaseController } from '../../libs/controller/base-controller.abstract.js';
import { Component } from '../../types/component.enum.js';
import { LoggerInterface } from '../../libs/logger/logger.interface.js';
import { UserServiceInterface } from './user-service.interface.js';
import { RestSchema } from '../../libs/config/rest.shema.js';
import { Config } from '../../libs/config/index.js';
import { HttpError } from '../../libs/errors/http-error.js';
import { fillDTO } from '../../helpers/common.js';
import { UserRdo } from '../rdo/user.rdo.js';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { ValidateDtoMiddleware } from '../../libs/middleware/validate-dto.middleware.js';
import { LoginUserDto } from '../dto/login-user.dto.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: LoggerInterface,
    @inject(Component.UserService)
    private readonly userService: UserServiceInterface,
    @inject(Component.Config) private readonly configService: Config<RestSchema>
  ) {
    super(logger);

    this.logger.info('Register routes for UserController');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)],
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)],
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkStatus,
    });
    this.addRoute({
      path: '/logout',
      method: HttpMethod.Post,
      handler: this.logout,
    });
  }

  public async checkStatus({ body }: Request, _res: Response): Promise<void> {
    const token = body.token;
    console.log(token);

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async logout({ body }: Request, _res: Response): Promise<void> {
    const token = body.token;
    console.log(token);

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async login({ body }: Request, _res: Response): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);

    if (!existUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController'
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async create({ body }: Request, res: Response): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);

    if (existUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(
      body,
      this.configService.get('SALT')
    );
    this.created(res, fillDTO(UserRdo, result));
  }
}
