import { ValueTransformer } from 'typeorm';

export class StringToNumberTransformer implements ValueTransformer {
  to(data?: number | null): number | null {
    if (!this.isNullOrUndefined(data)) {
      return data;
    }
    return null;
  }

  from(data?: string | null): number | null {
    if (!this.isNullOrUndefined(data)) {
      const res = parseFloat(data);
      if (isNaN(res)) {
        return null;
      } else {
        return res;
      }
    }
    return null;
  }

  isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
    return typeof obj === 'undefined' || obj === null;
  }
}
