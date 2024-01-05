/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {},
  output: 'standalone',
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    PROJECT_ID: process.env.PROJECT_ID,
  },
  async headers() {
    return [
      {
        source: "/api/scans/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: `${process.env.BASE_URL}` },
          { key: "Access-Control-Allow-Methods", value: "GET" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
}

module.exports = nextConfig
