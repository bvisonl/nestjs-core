import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class InvalidFormException extends HttpException {
  constructor(validationErrors: ValidationError[], message?: string, additionalErrors?: string[]) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        message: message || 'Please check the information provided.',
        errors: [...InvalidFormException.getErrors(validationErrors), ...additionalErrors],
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  static getErrors(validationErrors: ValidationError[]): string[] {
    const errors: string[] = [];
    validationErrors.forEach(e => {
      errors.push(...InvalidFormException.getConstraintError(e));
    });

    return errors;
  }

  static getConstraintError(validationError: ValidationError): string[] {
    const errors: string[] = [];

    // Push messages
    for (const [, message] of Object.entries(validationError.constraints)) {
      errors.push(message);
    }

    // Handle children
    if (validationError.children.length > 0) {
      errors.push(...InvalidFormException.getErrors(validationError.children));
    }

    return errors;
  }
}
