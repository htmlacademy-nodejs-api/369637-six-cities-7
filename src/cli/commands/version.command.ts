import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { CommandInterface } from './command.interface.js';

type PackageJSONConfig = {
  version: string;
};

const isPackageJSON = (value: unknown): value is PackageJSONConfig =>
  typeof value === 'object' &&
  !Array.isArray(value) &&
  value !== null &&
  Object.hasOwn(value, 'version');

export class VersionCommand implements CommandInterface {
  constructor(private readonly filePath: string = 'package.json') {}

  private readVersion(): string {
    const content = readFileSync(resolve(this.filePath), 'utf-8');
    const parsedContent: unknown = JSON.parse(content);

    if (!isPackageJSON(parsedContent)) {
      throw new Error('Not a package.json!');
    }

    return parsedContent.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._params: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error('Failed to read version');
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
