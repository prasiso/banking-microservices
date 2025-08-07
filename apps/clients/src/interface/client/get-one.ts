import { Prisma } from '@prisma/client';

export type ParamsGetOne = Omit<Prisma.clientFindFirstArgs, 'where'>;
