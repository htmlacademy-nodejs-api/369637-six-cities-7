import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseController } from '../../libs/controller/base-controller.abstract.js';
import { LoggerInterface } from '../../libs/logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { CreateCommentDto } from '../dto/create-comment.dto.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import { HttpError } from '../../libs/errors/http-error.js';
import { fillDTO } from '../../helpers/common.js';
import { CommentRdo } from '../rdo/comment.rdo.js';
import { ValidateDtoMiddleware } from '../../libs/middleware/validate-dto.middleware.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: LoggerInterface,
    @inject(Component.CommentService)
    private readonly commentService: CommentServiceInterface,
    @inject(Component.OfferService)
    private readonly offerService: OfferServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController');

    // this.addRoute({
    // path: '/',
    // method: HttpMethod.Get,
    // handler: this.index,
    // });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateCommentDto)],
    });
  }

  // public async index(req: Request, res: Response): Promise<void> {
  // const offerId = req.params.offerId;
  // const comments = await this.commentService.findByOfferId(offerId);
  // this.ok(res, fillDTO(CommentRdo, comments));
  // }

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
    if (!(await this.offerService.exists(body.offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }
    const result = await this.commentService.create(body);
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, result));
  }
}
