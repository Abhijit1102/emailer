declare module 'node-mocks-http' {
  import { IncomingMessage, ServerResponse } from 'http';
  import { NextApiRequest, NextApiResponse } from 'next';

  interface MockRequestOptions {
    method?: string;
    url?: string;
    headers?: Record<string, string>;
    body?: any;
  }

  interface MockResponseOptions {
    eventEmitter?: any;
  }

  function createMocks(
    reqOptions?: MockRequestOptions,
    resOptions?: MockResponseOptions
  ): {
    req: NextApiRequest & IncomingMessage;
    res: NextApiResponse & ServerResponse & {
      _getData: () => any;
      _getStatusCode: () => number;
    };
  };

  export { createMocks };
}
