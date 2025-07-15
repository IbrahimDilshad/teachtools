/** @type {import('next').NextConfig} */
import type {NextConfig} from 'next';

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, {isServer}) => {
    // Add a rule to handle .handlebars and .hbs files
    config.module.rules.push({
      test: /\.handlebars$|\.hbs$/,
      loader: 'handlebars-loader',
    });

    // Important: return the modified config
    return config;
  },
};

export default withPWA(nextConfig);
