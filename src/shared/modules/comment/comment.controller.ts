import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { BaseController } from '../../libs/controller/base-controller.abstract.js';
import { LoggerInterface } from '../../libs/logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { CreateCommentDto } from '../dto/create-comment.dto.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: LoggerInterface,
    @inject(Component.CommentService)
    private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.index,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
    });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const offerId = Number.parseInt(req.params.offerId, 10);
    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, comments);
  }

  public async create(
    {
      body,
    }: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      CreateCommentDto
    >,
    res: Response
  ): Promise<void> {
    const result = this.commentService.create(body);
    this.created(res, result);
  }
}
