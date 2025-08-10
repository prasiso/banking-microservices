import { Transform } from 'class-transformer';

export function ToDate() {
    return Transform(({ value }) => new Date(value));
}
