import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { getManager } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsUniqueValidator implements ValidatorConstraintInterface {
  validate(columnNameValue: any, args: ValidationArguments) {
    const params = args.constraints[0];
    params.pk = params.pk || 'id';
    let query = `SELECT * FROM ${params.table} WHERE ${params.column} = '${columnNameValue}'`;
    if (args.object[params.pk]) {
      query += ` AND ${params.pk} != ${args.object[params.pk]} `;
    }
    return getManager()
      .query(query)
      .then(results => {
        if (results[0]) return false;
        return true;
      });
  }
}
export function IsUnique(params: {}, validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [params],
      validator: IsUniqueValidator,
    });
  };
}
