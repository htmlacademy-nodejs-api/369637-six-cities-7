import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';

import type { DatabaseClientInterface } from './index.js';
import { Component } from '../../types/index.js';
import type { LoggerInterface } from '../logger/index.js';

enum Retry {
  COUNT = 5,
  TIMEOUT = 1000,
}

@injectable()
export class MongoDatabaseClient implements DatabaseClientInterface {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly logger: LoggerInterface
  ) {
    this.isConnected = false;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error('MongoDB client is already connected');
    }

    this.logger.info('Connecting to MongoDB…');
    let attempt = 0;
    while (attempt < Retry.COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(
          `Failed to connect to the database. Attempt ${attempt}`,
          error as Error
        );
        await setTimeout(Retry.TIMEOUT);
      }
    }
    throw new Error(
      `Unable to connect to the  database after ${Retry.COUNT} attempts`
    );
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect();
    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}
