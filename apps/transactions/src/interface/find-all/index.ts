import { transaction } from '@prisma/client';

export interface FindAllTransaction extends transaction {
  type: 'SEND' | 'RECEIVER';
}
