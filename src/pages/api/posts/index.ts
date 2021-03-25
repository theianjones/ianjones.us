import octokit from 'utils/octokit'
import {NextApiRequest, NextApiResponse} from 'next'
import {getPosts} from 'utils/post.server'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await getPosts(octokit)
  res.setHeader(
    'Cache-Control',
    'public, max-age=300, stale-while-revalidate=86400',
  )
  res.statusCode = 200
  res.json(posts)
}
