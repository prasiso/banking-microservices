import { transaction } from '@prisma/client';
import { Client } from './client';

export interface Transaction extends transaction {
  sender?: Client;
  receiver?: Client;
}
