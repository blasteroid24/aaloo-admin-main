// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: [
//       'localhost', 
//       'exponentappbe.scaleupally.io', 
//       'expoappbe.scaleupally.io', 
//       'getstream.io', 
//       'example.com', 
//       'manage.exponentgroup.org',
//       'imagedelivery.net',
//       'dev.manage.solveline.scaleupdevops.in' // Added the required domain
//     ],
//   },
// }

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'aalooo-dev-bucket.s3.ap-south-1.amazonaws.com',
      'images.unsplash.com', // ✅ Added Unsplash domain
      'media.istockphoto.com',
      'exponentappbe.scaleupally.io',
      'expoappbe.scaleupally.io',
      'getstream.io',
      'local.exponent.com',
      'staging.manage.exponent.scaleupdevops.in',
      'example.com',
      'manage.exponentgroup.org',
      'imagedelivery.net',
      'dev.manage.solveline.scaleupdevops.in',
    ],
  },
};

module.exports = nextConfig;


