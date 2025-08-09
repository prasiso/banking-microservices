const clientPrismaMock = {
  client: {
    findFirst: jest.fn(),
    count: jest.fn(),
    update: jest.fn(),
  },
  banking: {
    count: jest.fn(),
  },
};
export const prismaMock = {
  ...clientPrismaMock,
  $transaction: jest.fn().mockImplementation((fn) => fn(clientPrismaMock)),
};

export const cacheMock = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  reset: jest.fn(),
  buildKey: jest.fn(),
};

export const rabbitMQMock = {
  emit: jest.fn(),
};

export const s3Mock = {
  upload_file: jest.fn(),
  get_signed_url: jest.fn(),
};
