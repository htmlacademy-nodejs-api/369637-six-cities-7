import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
// import { StatusCodes } from 'http-status-codes';

import { BaseController } from '../../libs/controller/base-controller.abstract.js';
import { Component } from '../../types/component.enum.js';
import { LoggerInterface } from '../../libs/logger/logger.interface.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { CreateOfferDto } from '../dto/create-offer.dto.js';
import { UpdateOfferDto } from '../dto/update-offer.dto.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: LoggerInterface,
    @inject(Component.OfferService)
    private readonly offerService: OfferServiceInterface
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
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getOfferInfo,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Put,
      handler: this.updateOffer,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteOffer,
    });
    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.getPremium,
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

  public async toggleIsFavorite(req: Request, res: Response) {
    const offer = this.offerService.toggleIsFavorite(
      req.params.userId,
      req.params.offerId
    );
    this.ok(res, offer);
  }

  public async getFavorites(_req: Request, res: Response) {
    // const userId = req.params.userId;
    const favoriteOffers = this.offerService.findFavorites();
    this.ok(res, favoriteOffers);
  }

  public async getPremium(req: Request, res: Response) {
    const cityName = req.params.city;
    const premiumOffers = this.offerService.findPremium(cityName);
    this.ok(res, premiumOffers);
  }

  public async deleteOffer(req: Request, res: Response) {
    const offerId = Number.parseInt(req.params.offerId, 10);
    const offer = await this.offerService.deleteById(offerId);
    this.ok(res, offer);
  }

  public async updateOffer(
    req: Request<
      Record<string, string>,
      Record<string, unknown>,
      UpdateOfferDto
    >,
    res: Response
  ) {
    const offerId = Number.parseInt(req.params.offerId, 10);
    const updatedOffer = await this.offerService.updateById(offerId, req.body);
    this.ok(res, updatedOffer);
  }

  public async getOfferInfo(req: Request, res: Response) {
    const offerId = Number.parseInt(req.params.offerId, 10);
    const offerInfo = await this.offerService.findById(offerId);
    this.ok(res, offerInfo);
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(res, offers);
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
    const result = this.offerService.create(body);
    this.created(res, result);
  }
}
