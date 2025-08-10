import { Transform } from 'class-transformer';

export function ToNumber() {
  return Transform(({ value }) => +value);
}
