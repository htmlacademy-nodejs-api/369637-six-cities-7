import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import type { FileReaderInterface } from './file-reader.interface.js';
import type {
  Offer,
  City,
  OfferType,
  Facilitie,
  User,
} from '../types/index.js';

export const PARSE_INT_LIMIT = 10;
const BOOLEAN = 'true';

export class TSVFileReader extends EventEmitter implements FileReaderInterface {
  // private rowData = '';
  private CHUNK_SIZE = 16384; // 16KB

  constructor(private readonly fileName: string) {
    super();
  }

  private parseBoolean(value: string): boolean {
    return value === BOOLEAN;
  }

  private parsePrice(value: string) {
    return parseInt(value, PARSE_INT_LIMIT);
  }

  private parseLineToOffer(line: string): Offer {
    const [
      name,
      description,
      createdDate,
      city,
      preview,
      photosList,
      isPremium,
      isFavorite,
      rating,
      type,
      roomsCount,
      guestsCount,
      price,
      facilitiesList,
      author,
      comments,
      latitude,
      longitude,
    ] = line.split('\t');

    return {
      name,
      description,
      date: new Date(createdDate),
      city: city as City,
      preview,
      photos: photosList.split(';'),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: Number(rating),
      type: type as OfferType,
      roomsCount: Number(roomsCount),
      guestsCount: Number(guestsCount),
      price: this.parsePrice(price),
      facilities: facilitiesList.split(';') as Facilitie[],
      author: author as unknown as User,
      comments: Number(comments),
      latitude: Number(latitude),
      longitude: Number(longitude),
    };
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.fileName, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePos = -1;
    let rowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePos = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePos + 1);
        remainingData = remainingData.slice(++nextLinePos);
        rowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', rowCount);
  }
}
