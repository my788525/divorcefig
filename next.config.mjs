/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  // Static export does not need build traces (serverless file tracing);
  // disabling avoids the slow/blocked "Collecting build traces" step in
  // restricted network environments.
  outputFileTracing: false,
};

export default nextConfig;
