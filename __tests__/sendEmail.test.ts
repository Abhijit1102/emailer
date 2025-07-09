jest.mock('@/lib/EmailService', () => {
  return {
    EmailService: jest.fn().mockImplementation(() => ({
      sendEmail: jest.fn().mockResolvedValue({ status: 'sent', provider: 'MockProvider' }),
    })),
  };
});

import handler from '@/pages/api/v1/send-email';
import { createMocks } from 'node-mocks-http';

describe('POST /api/v1/send-email', () => {
  it('should return 200 if email sent successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        to: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test Body',
        id: 'unique-id-1234',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data).toEqual({ status: 'sent', provider: 'MockProvider' });
  });

  it('should return 400 if required fields are missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        to: '',
        subject: '',
        body: '',
        id: '',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Missing required fields',
    });
  });

  it('should return 405 for non-POST methods', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });
});
