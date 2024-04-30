import { CommandInterface } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/tsv-file-reader.js';
import chalk from 'chalk';

import type { Offer } from '../../shared/types/index.js';

export class ImportCommand implements CommandInterface {
  public getName(): string {
    return '--import';
  }

  private onImportOffer(offer: Offer): void {
    console.info(offer);
  }

  private onCompleteImport(count: number): void {
    console.info(`${count} rows are imported`);
  }

  public async execute(...params: string[]): Promise<void> {
    const [fileName] = params;
    const fileReader = new TSVFileReader(fileName.trim());

    fileReader.on('line', this.onImportOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error: unknown) {
      console.error(chalk.red('Failed to read data'));
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
