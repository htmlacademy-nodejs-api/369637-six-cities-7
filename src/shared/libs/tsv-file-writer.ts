import { WriteStream } from 'node:fs';
import { createWriteStream } from 'node:fs';

import type { FileWriterInterface } from './file-writer.interface.js';

export class TSVFileWriter implements FileWriterInterface {
  private stream: WriteStream;

  constructor(fileName: string) {
    this.stream = createWriteStream(fileName, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true,
    });
  }

  public async write(row: string): Promise<unknown> {
    const writeOK = this.stream.write(`${row}\n`);

    if (!writeOK) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve(true));
      });
    }

    return Promise.resolve();
  }
}
