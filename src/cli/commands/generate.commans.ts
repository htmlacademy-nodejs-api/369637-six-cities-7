import got from 'got';

import { CommandInterface } from './command.interface.js';
import { OfferGenerator } from '../../shared/libs/index.js';
import { PARSE_INT_LIMIT } from '../../shared/libs/index.js';
import { TSVFileWriter } from '../../shared/libs/index.js';

import type { MockServerData } from '../../shared/types/mock-server-data.type.js';

export class GenerateCommand implements CommandInterface {
  private initialData: MockServerData;

  public getName(): string {
    console.log(this.initialData);
    return '--generate';
  }

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filePath: string, offersCount: number) {
    const offerGenerator = new OfferGenerator(this.initialData);
    const fileWriter = new TSVFileWriter(filePath);

    for (let i = 0; i < offersCount; i++) {
      await fileWriter.write(offerGenerator.generate());
    }
  }

  public async execute(...params: string[]): Promise<void> {
    const [count, filePath, url] = params;
    const offerCount = Number.parseInt(count, PARSE_INT_LIMIT);

    try {
      await this.load(url);
      await this.write(filePath, offerCount);
      console.info('File was created');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log('Error while genereting data');
    }
  }
}
