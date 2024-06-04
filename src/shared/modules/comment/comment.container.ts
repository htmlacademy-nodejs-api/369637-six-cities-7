import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { Component } from '../../types/component.enum.js';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { DefaultCommentService } from './default-comment-service.js';
import { ControllerInterface } from '../../libs/controller/controller.interface.js';
import { CommentController } from './comment.controller.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer
    .bind<CommentServiceInterface>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  commentContainer
    .bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);

  commentContainer
    .bind<ControllerInterface>(Component.CommentController)
    .to(CommentController)
    .inSingletonScope();

  return commentContainer;
}
