import { CommandInterface } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/tsv-file-reader.js';

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
      console.error('Failed to read data');
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
