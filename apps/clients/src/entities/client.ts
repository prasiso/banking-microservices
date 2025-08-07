import { client } from '@prisma/client';
import { Banking } from './banking';

export interface Client extends Partial<client> {
  banking?: Banking;
}
