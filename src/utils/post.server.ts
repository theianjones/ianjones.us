import {downloadDirectory, downloadFile} from 'utils/github.server'
import type {Octokit} from '@octokit/rest'
import find from 'lodash/find'
import {GitHubFile} from '../../types'
import {getPostBySlug} from './org.server'

const cleanUpSlug = (slug: string | string[]) => {
  if (typeof slug === 'object') {
    return slug.join('').replace(/-/, '_')
  }
  return slug.replace(/-/, '_')
}

const getPost = async (octokit: Octokit, slug: string | string[]) => {
  const cleanedSlug = cleanUpSlug(slug)

  if (process.env.NODE_ENV === 'production') {
    const dirs = await downloadDirectory(octokit, '')
    const post = find(dirs, (dir: GitHubFile) => {
      const slugifiedPath = dir.path.replace(/.org/, '')
      return slugifiedPath === cleanedSlug
    })

    return post
  } else {
    const post = await getPostBySlug(cleanedSlug)
    return post
  }
}

export {getPost}
