// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextApiRequest, NextApiResponse} from 'next'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const links = await prisma.links.count()
  console.log(links)
  res.statusCode = 200
  res.json({links})
}
