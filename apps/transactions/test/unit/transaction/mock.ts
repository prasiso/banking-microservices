const clientPrismaMock = {
  client: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  transaction: {
    create: jest.fn(),
    count: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
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
export const cacheMock = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  reset: jest.fn(),
  buildKey: jest.fn(),
};
