import octokit from 'utils/octokit'
import {NextApiRequest, NextApiResponse} from 'next'
import {downloadDirectory, downloadFile} from 'utils/github.server'
import {getPost} from 'utils/post.server'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const post = await getPost(octokit, req.query.slug)
  res.setHeader(
    'Cache-Control',
    'public, max-age=300, stale-while-revalidate=86400',
  )
  res.statusCode = 200
  res.json(post)
}
