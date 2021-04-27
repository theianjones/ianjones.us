import unified from 'unified'
import visit from 'unist-util-visit'
import inspectUrls from 'rehype-url-inspector'

import orgParse from 'uniorg-parse'
import org2rehype from 'uniorg-rehype'
import compact from 'lodash/compact'
import {includes} from 'lodash'

const fileIdToPath: {[key: string]: string} = {}

const processor = unified()
  .use(orgParse)
  .use(extractExportSettings)
  .use(org2rehype)
  .use(inspectUrls, {inspectEach: processUrl as any})
  .use(toJson)

export default async function orgToHtml(file: any) {
  try {
    return await processor.process(file)
  } catch (e) {
    console.error('failed to process file', file.path, e)
    throw e
  }
}

interface NodeProperty {
  type: 'node-property'
  key: string
  value: any
}

interface Node {
  type: string
  contentsBegin: number
  contentsEnd: number
  children: NodeProperty[]
}

/**
 * Extract all `#+KEYWORD`'s from org post and attach them to
 * `file.data`.
 */
function extractExportSettings() {
  return transformer

  function transformer(node: any, file: any) {
    visit(node, 'property-drawer', (prop: any, index, parent) => {
      // if the parents contentsBegin is 0 we know its the first one

      if (parent?.type === 'section' && parent.contentsBegin === 0) {
        prop.children.forEach((child: NodeProperty) => {
          const key = child.key.toLowerCase()
          file.data[key] = child.value
          if (key === 'id') {
            fileIdToPath[child.value] = file.data.slug
          }
        })
      }
    })
    // Visit every keyword in the org file and copy its value to the
    // file. file is then returned from processor.process, so all
    // keywords are available outside.
    visit(node, 'keyword', function (kw: any) {
      file.data[kw.key.toLowerCase()] = kw.value
    })
  }
}

interface ProcessUrlArgs {
  url: any
  propertyName: any
  node: any
  file: any
}

/**
 * Process each link to:
 * 1. Convert file:// links to path used by blog. file://file.org -> /file.org
 * 2. Collect all links to file.data.links, so they can be used later
 * to calculate backlinks.
 */
function processUrl({
  url: urlString,
  propertyName,
  node,
  file,
}: ProcessUrlArgs) {
  // next/link does not handle relative urls properly. Use file.path
  // (the slug of the file) to normalize link against.
  try {
    let url = new URL(urlString, 'file://' + file.path)

    if (url.protocol === 'file:') {
      let href = url.pathname.replace(/\.org$/, '')
      node.properties[propertyName] = href

      file.data.links = file.data.links ?? []
      file.data.links.push(href)
    } else if (url.protocol === 'id:') {
      let path = fileIdToPath[url.pathname]
      if (
        process.env.NODE_ENV === 'development' &&
        file.data.published &&
        typeof path === 'undefined'
      ) {
        console.error(`Unresolved link in ${file.data.slug}`)
      } else {
        let href = `/notes/${path}`
        node.properties[propertyName] = href
        file.data.links = file.data.links ?? []
        file.data.links.push(path)
      }
    }
  } catch (e) {
    // This can happen if org file contains an invalid string, that
    // looks like URL string (e.g., "http://example.com:port/" passes
    // regexes, but fails to parse as URL).
    console.warn('Failed to process URL', urlString, e)
    // No re-throwing: the issue is not critical enough to stop
    // processing. The document is still valid, it's just link that
    // isn't.
  }
}

/** A primitive compiler to return node as is without stringifying. */
function toJson(this: any) {
  this.Compiler = (node: any) => {
    return node
  }
}
