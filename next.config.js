/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental.serverActions.allowedOrigins: []
  experimental: {
    serverActions: {
      allowedOrigins: [
        'http://localhost',
        'https://localhost/api',
      ]
    }
  }
}

module.exports = nextConfig
const path = require('path')
module.exports = {
  sassOptions: {
    fibers: false,
    includePaths: [path.join(__dirname, 'styles')],
  },
}