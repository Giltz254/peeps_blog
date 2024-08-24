/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
    images: {
        remotePatterns: [
            {
              protocol: 'http',
              hostname: 'res.cloudinary.com',
            },
            {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
            },
            {
              protocol: 'https',
              hostname: 'avatars.githubusercontent.com'
            },
            {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
            },
            {
              protocol: 'https',
              hostname: 'unsplash.com',
            },
          ],
    }
};

export default nextConfig;
