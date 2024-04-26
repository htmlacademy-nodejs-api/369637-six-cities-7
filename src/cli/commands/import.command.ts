import { CommandInterface } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/tsv-file-reader.js';
import chalk from 'chalk';

export class ImportCommand implements CommandInterface {
  public getName(): string {
    return '--import';
  }

  public async execute(...params: string[]): Promise<void> {
    const [fileName] = params;
    const fileReader = new TSVFileReader(fileName.trim());

    try {
      fileReader.read();
      console.info(fileReader.toArray());
    } catch (error: unknown) {
      console.error(chalk.red('Failed to read data'));
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
