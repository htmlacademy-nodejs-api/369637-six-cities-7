import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseController } from '../../libs/controller/base-controller.abstract.js';
import { Component } from '../../types/component.enum.js';
import { LoggerInterface } from '../../libs/logger/logger.interface.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { CreateOfferDto } from '../dto/create-offer.dto.js';
import { UpdateOfferDto } from '../dto/update-offer.dto.js';
import { HttpError } from '../../libs/errors/http-error.js';
import { fillDTO } from '../../helpers/common.js';
import { OfferRdo } from '../rdo/offer.rdo.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import { CommentRdo } from '../rdo/comment.rdo.js';
import { ValidateObjectIdMiddleware } from '../../libs/middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../libs/middleware/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../libs/middleware/document-exists.middleware.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: LoggerInterface,
    @inject(Component.OfferService)
    private readonly offerService: OfferServiceInterface,
    @inject(Component.CommentService)
    private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getOfferInfo,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.updateOffer,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteOffer,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getOfferComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.getPremium,
    });
    this.addRoute({
      path: '/:userId/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
    });
    this.addRoute({
      path: '/:userId/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
    });
    this.addRoute({
      path: '/:userId/favorites/:offerId',
      method: HttpMethod.Post,
      handler: this.toggleIsFavorite,
    });
  }

  public async getOfferComments(req: Request, res: Response) {
    const offerId = req.params.offerId;
    if (!(await this.offerService.exists(offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }
    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async toggleIsFavorite(req: Request, res: Response) {
    const offer = await this.offerService.toggleIsFavorite(
      req.params.userId,
      req.params.offerId
    );

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async getFavorites(req: Request, res: Response) {
    const userId = req.params.userId;
    const favoriteOffers = await this.offerService.findFavorites(userId);
    this.ok(res, fillDTO(OfferRdo, favoriteOffers));
  }

  public async getPremium(req: Request, res: Response) {
    const cityName = req.params.city;
    const premiumOffers = await this.offerService.findPremium(cityName);

    this.ok(res, fillDTO(OfferRdo, premiumOffers));
  }

  public async deleteOffer(req: Request, res: Response) {
    const offerId = req.params.offerId;
    const offer = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async updateOffer(
    req: Request<
      Record<string, string>,
      Record<string, unknown>,
      UpdateOfferDto
    >,
    res: Response
  ) {
    const offerId = req.params.offerId;
    const updatedOffer = await this.offerService.updateById(offerId, req.body);
    if (!updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getOfferInfo(req: Request, res: Response) {
    const offerId = req.params.offerId;
    const offerInfo = await this.offerService.findById(offerId);
    if (!offerInfo) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, offerInfo);
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create(
    {
      body,
    }: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      CreateOfferDto
    >,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }
}
