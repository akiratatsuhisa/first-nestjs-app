import { ValidationError } from '@nestjs/common';
import * as _ from 'lodash';
import { AppError } from 'src/common/errors';

export function parseErrorsDetail(errors: Array<ValidationError>) {
  return _(errors)
    .map((error) => ({
      [error.property]: {
        message: _.find(error.constraints),
        children: error.children?.length
          ? parseErrorsDetail(error.children)
          : undefined,
      },
    }))
    .thru((result) => {
      return Object.assign({}, ...result) as Record<string, unknown>;
    });
}

export function parseErrors(errors: Array<ValidationError>) {
  return _(errors)
    .map((error) => [
      _.find(error.constraints),
      ...(error.children?.length ? parseErrors(error.children) : []),
    ])
    .flatten()
    .filter((text) => !_.isNil(text));
}

export function exceptionFactory(errors: ValidationError[], detail?: boolean) {
  const result = new AppError.BadDto();

  result.setErrors(detail ? parseErrorsDetail(errors) : parseErrors(errors));

  return result;
}
