const withPlugins = require('next-compose-plugins')
const withMDX = require('@next/mdx')()
const shiki = require('rehype-shiki')
const nextConfig = {
  reactStrictMode: true,
  target: 'serverless',
  async redirects() {
    return [
      {
        source: '/course/remix',
        destination:
          'https://egghead.io/courses/learn-remix-by-building-a-social-media-platform-with-typescript-and-prisma-cddb0550?af=ay44db', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
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
