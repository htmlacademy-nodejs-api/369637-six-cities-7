import { injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { ControllerInterface } from './controller.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { RouteInterface } from '../../types/route.interface.js';

@injectable()
export abstract class BaseController implements ControllerInterface {
  private readonly DEFAULT_CONTENT_TYPE = 'application/json';
  private readonly _router: Router;

  constructor(protected readonly logger: LoggerInterface) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: RouteInterface): void {
    const wrapper = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map((item) =>
      asyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers
      ? [...middlewareHandlers, wrapper]
      : wrapper;
    this._router[route.method](route.path, allHandlers);
    this.logger.info(
      `Route registered: ${route.method.toUpperCase()} ${route.path}`
    );
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res.type(this.DEFAULT_CONTENT_TYPE).status(statusCode).json(data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }
}
