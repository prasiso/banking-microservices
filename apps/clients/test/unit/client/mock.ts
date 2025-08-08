export const prismaMock = {
  client: {
    findFirst: jest.fn(),
    count: jest.fn(),
    update: jest.fn()
  },
};

export const cacheMock = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  reset: jest.fn(),
  buildKey: jest.fn(),
}

export const rabbitMQMock = {
  emit: jest.fn()
}
