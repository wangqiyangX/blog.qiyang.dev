import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  serverExternalPackages: ['@takumi-rs/image-response', 'typescript', 'twoslash'],
  async rewrites() {
    return [
      {
        source: '/posts/:path*.mdx',
        destination: '/llms.mdx/posts/:path*',
      },
    ];
  },
};

export default withMDX(config);
