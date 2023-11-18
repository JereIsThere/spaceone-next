/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
const path = require('path')
 
module.exports = {
  sassOptions: {
    fibers: false,
    includePaths: [path.join(__dirname, 'styles')],
  },
}