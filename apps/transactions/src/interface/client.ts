import { client } from '@prisma/client';

export interface Client extends client {
  balance: number;
}
