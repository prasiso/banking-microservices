import { createProxyMiddleware } from 'http-proxy-middleware';

export function createProxy(target: string) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    headers: {
      authorization: String(process.env.INTERNAL_ACCESS_TOKEN),
    },
  });
}
