const clientPrismaMock = {
  client: {
    findMany: jest.fn(),
    update: jest.fn(),
  },
  transaction: {
    create: jest.fn(),
    update: jest.fn(),
  },
};
export const prismaMock = {
  ...clientPrismaMock,
  $transaction: jest
    .fn()
    .mockImplementation((fn) =>
      typeof fn === 'function' ? fn(clientPrismaMock) : clientPrismaMock,
    ),
};

export const rabbitMQMock = {
  emit: jest.fn(),
};
