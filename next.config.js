const withPlugins = require('next-compose-plugins')
const withMDX = require('@next/mdx')()
const shiki = require('rehype-shiki')
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return []
  },
}

module.exports = withPlugins(
  [
    withMDX({
      pageExtensions: ['ts', 'tsx', 'mdx'],
      remarkPlugins: [
        require('remark-slug'),
        require('remark-footnotes'),
        require('remark-code-titles'),
      ],
      rehypePlugins: [
        [
          shiki,
          {
            theme: './code-theme.json',
            useBackground: false,
          },
        ],
      ],
    }),
  ],
  nextConfig,
)
