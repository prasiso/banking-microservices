import { Prisma } from "@prisma/client";

export const optTransactionGetOne: Prisma.transactionFindFirstArgs = {
  include: {
    send: {
      select: {
        name: true,
        id_client: true,
      },
    },
    receiver: {
      select: {
        name: true,
        id_client: true,
      },
    },
  },
};
