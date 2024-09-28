import { ConflictException } from '@nestjs/common';

export class DuplicateFieldException extends ConflictException {
  constructor(field: string, value: string) {
    super(`Duplicate value for field "${field}": "${value}"`);
  }
}
