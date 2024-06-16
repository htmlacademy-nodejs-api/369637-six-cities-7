import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import * as crypto from 'node:crypto';

import { MiddlewareInterface } from './middleware.interface.js';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(private uploadDirectory: string, private fieldName: string) {}

  public async execute(
    req: Request<
      ParamsDictionary,
      unknown,
      unknown,
      ParsedQs,
      Record<string, unknown>
    >,
    res: Response<unknown, Record<string, unknown>>,
    next: NextFunction
  ): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, cb) => {
        const fileExt = extension(file.mimetype);
        const filename = crypto.randomUUID();
        cb(null, `${filename}.${fileExt}`);
      },
    });

    const uploadSingleFileMiddleware = multer({ storage }).single(
      this.fieldName
    );

    uploadSingleFileMiddleware(req, res, next);
  }
}
