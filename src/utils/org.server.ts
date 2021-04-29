import * as path from 'path'
import trough from 'trough'
import toVFile from 'to-vfile'
import findDown from 'vfile-find-down'
import rename from 'vfile-rename'
import report from 'vfile-reporter'
import orgToHtml from './orgToHtml'
import map from 'lodash/map'
import {filter, find, get, includes, last} from 'lodash'
// We serve posts from "public" directory, so that we don't have to
// copy assets.
//
// If you change this directory, make sure you copy all assets
// (images, linked files) to the public directory, so that next.js
// serves them.
const pagesDirectory = path.join(
  process.cwd(),
  get(process, 'env.ORG_ROAM_SUBMODULE_DIRECTORY', 'org-roam'),
)

const processor = trough()
  .use(collectFiles)
  .use(processPosts)
  // .use(populateIds)
  .use(populateBacklinks)

interface VFile {
  data: any
  messages: any
  history: string[]
  cwd: string
  basename: string
  dirname: string
}

export function generateFileSlug(filePath?: string) {
  if (!filePath) {
    return
  }
  const root =
    process.env.NODE_ENV === 'production'
      ? '/opt/build/repo/org-roam'
      : '/Users/ianjones/Code/blog-5.0/org-roam'
  const slug = path.relative(root, filePath).replace(/\.org$/, '')
  return slug.replace(/\./g, '/')
}

export function generateNotePathFromFilePath(filePath?: string) {
  if (filePath) {
    const slug = generateFileSlug(filePath)
    return `/notes/${slug}`
  }
}

function collectFiles(root: any) {
  return new Promise((resolve, reject) => {
    findDown.all(
      (f: VFile, stats: any) => {
        const parentDir = last(f.dirname.split('/'))
        const pagesDir = last(pagesDirectory.split('/'))
        return (
          parentDir === pagesDir &&
          stats.isFile() &&
          f.basename.endsWith('.org')
        )
      },
      root,
      (err: any, files: any) => {
        if (err) {
          reject(err)
        } else {
          files.forEach((f: any) => {
            let slug = path.relative(root, f.path).replace(/\.org$/, '')
            slug = slug.replace(/\./g, '/')
            f.data.slug = slug
            f.data.path = `${get(
              process,
              'env.NOTES_PREFIX',
              '/notes',
            )}/${slug}`
          })
          resolve({...files})
        }
      },
    )
  })
}

async function processPosts(files: any) {
  return Promise.all(map(files, processPost))

  async function processPost(file: any) {
    try {
      await toVFile.read(file, 'utf8')
    } catch (e) {
      console.error('Error reading file', file, e)
      throw e
    }

    rename(file, {path: file.data.path})

    await orgToHtml(file)

    return file
  }
}

function populateIds(files: any) {
  files.forEach((file: any) => {
    if (
      process.env.PUBLISHED_ATTRIBUTE &&
      get(file.data, process.env.PUBLISHED_ATTRIBUTE) === 'true'
    ) {
      let data: {[key: string]: string} = {}
      file.contents.split('\n').some((subString: string) => {
        if (subString === ':PROPERTIES:' || subString === ':END:') {
          return subString === ':END:'
        }
        const match = subString.match(/:(.*?):(?<=:.*?:)(.*)/)
        if (match) {
          const [_, key, value] = match
          data[key] = value.trim()
        }
      })
      file.data = {...file.data, ...data}
    }
  })

  return files
}

// Assign all collected backlinks to file. This function should be
// called after all pages have been processed---otherwise, it might
// miss backlinks.
function populateBacklinks(files: any) {
  let backlinks = {} as any
  files.forEach((file: any) => {
    if (
      process.env.PUBLISHED_ATTRIBUTE &&
      get(file.data, process.env.PUBLISHED_ATTRIBUTE) === 'true'
    ) {
      file.data.links = file.data.links || new Set()
      file.data.backlinks = backlinks[file.data.slug] =
        backlinks[file.data.slug] || new Set()

      file.data.links.forEach((other: any) => {
        backlinks[other] = backlinks[other] || new Set()
        backlinks[other].add(file.data.path)
      })
    }
    // if (file.data.slug === 'product/script-kit') {
    //   console.log(file)
    // }
    // if (
    //   file.data.slug === 'lang/bash' ||
    //   file.data.slug === 'lang/javascript' ||
    //   file.data.slug === 'lang/io'
    // ) {
    //   console.log(file)
    // }
  })
}

const loadPosts = async () => {
  const files = (await new Promise((resolve, reject) =>
    processor.run(pagesDirectory, (err: any, files: any) => {
      console.error(report(err || files, {quiet: true}))
      if (err) reject(err)
      else resolve(files)
    }),
  )) as any
  const publishedFiles = filter(files, (file) => {
    if (process.env.PUBLISHED_ATTRIBUTE) {
      return get(file?.data, process.env.PUBLISHED_ATTRIBUTE) === 'true'
    } else {
      return true
    }
  })
  return publishedFiles
}

let postsCache: any

const allPosts = async () => {
  if (postsCache) {
    return postsCache
  }
  const posts = await loadPosts()
  return posts
}

if (!postsCache) {
  allPosts().then((posts) => (postsCache = posts))
}

export async function getAllPaths() {
  const posts = await loadPosts()
  return posts.map((post) => post.path)
}

export async function getPostBySlug(slug: string) {
  const posts = await allPosts()
  const post = find(posts, (post) => {
    return post.data.slug === slug
  })
  return post
}

export async function getAllPosts() {
  const posts = await allPosts()
  return await Promise.all(Object.values(posts))
}
