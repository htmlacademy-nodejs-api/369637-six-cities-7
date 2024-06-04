import { CommandInterface } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/tsv-file-reader.js';
// import chalk from 'chalk';

import type { Offer } from '../../shared/types/index.js';
import type { UserServiceInterface } from '../../shared/modules/user/user-service.interface.js';
import type { OfferServiceInterface } from '../../shared/modules/offer/offer-service.interface.js';
import type { DatabaseClientInterface } from '../../shared/libs/database-client/database-client.interface.js';
import type { LoggerInterface } from '../../shared/libs/logger/logger.interface.js';
import { DefaultUserService } from '../../shared/modules/user/default-user.service.js';
import { DefaultOfferService } from '../../shared/modules/offer/default-offer.service.js';
import { MongoDatabaseClient } from '../../shared/libs/database-client/mongo.database-client.js';

import { ConsoleLogger } from '../../shared/libs/logger/index.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';
import { OfferModel } from '../../shared/modules/offer/offer.entity.js';
import { DEFAULT_USER_PASSWORD, DEFAULT_DB_PORT } from './command.constant.js';
import { getMongoURI } from '../../shared/helpers/database.js';

export class ImportCommand implements CommandInterface {
  private userService: UserServiceInterface;
  private offerService: OfferServiceInterface;
  private databaseClient: DatabaseClientInterface;
  private logger: LoggerInterface;
  private salt: string;

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedOffer(offer: Offer, resolve: () => void) {
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate(
      {
        ...offer.userId,
        firstName: 'Ivan',
        lastName: 'Ivanov',
        email: 'ivan@gmail.com',
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt
    );

    await this.offerService.create({
      userId: user.id,
      name: offer.name,
      description: offer.description,
      date: offer.date,
      city: offer.city,
      preview: offer.preview,
      photos: offer.photos,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      ratings: [],
      type: offer.type,
      roomsCount: offer.roomsCount,
      guestsCount: offer.guestsCount,
      price: offer.price,
      facilities: offer.facilities,
      comments: offer.comments,
      latitude: offer.latitude,
      longitude: offer.longitude,
    });
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());
    console.log('fileReader', fileReader);
    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      // console.error(getErrorMessage(error));
    }
  }
}
