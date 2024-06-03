/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "media.licdn.com",
      "lh3.googleusercontent.com",
      "y-dev.s3.ap-south-1.amazonaws.com",
      "localhost"
    ],
  },
};

export default nextConfig;
