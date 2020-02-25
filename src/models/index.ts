import * as Joi from '@hapi/joi';

export interface Auth {
  userId: number;
  authority: number;
  allowedPaths: string[];
}

export const authSchema = Joi.object({
  userId: Joi.number().required(),
  authority: Joi.number().required(),
  allowedPaths: Joi.array().items(Joi.string()).required(),
});
