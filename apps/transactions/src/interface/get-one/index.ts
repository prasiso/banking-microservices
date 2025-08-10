import { Prisma } from '@prisma/client';

export type ParamsGetOne = Omit<Prisma.transactionFindFirstArgs, 'where'>;
