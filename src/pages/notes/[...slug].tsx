import React from 'react'
import Head from 'next/head'
import {getAllPaths} from 'utils/org.server'
import Rehype from 'components/rehype'
import {GetStaticProps} from 'next'
import {first, map, compact} from 'lodash'
import Articles from 'components/articles'
import {getPost} from 'utils/post.server'
import SEO from 'components/seo'

const Note = ({title, hast, resourceLink, backlinks}: any) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <SEO metaData={title} isBlogPost />
      <main>
        <h1
          className={`text-5xl md:text-5xl font-semibold my-12 text-gray-800 dark:text-gray-300 font-serif ${
            resourceLink ? 'mb-3' : 'mb-6'
          }`}
        >
          {title}
        </h1>
        {resourceLink && (
          <div className="mb-6">
            <a href={resourceLink} className="text-purple-600 ">
              Resource Link
            </a>
          </div>
        )}
        <div className="markdown article-width dark:text-gray-300">
          <Rehype hast={hast} />
        </div>
      </main>
      {!!backlinks?.length && (
        <section className="article-width bg-purple-50 dark:bg-gray-800 p-4 rounded">
          <h2 className="prose-xl dark:text-gray-400">Backlinks</h2>
          <Articles articles={backlinks} />
        </section>
      )}
    </>
  )
}
export default Note

export const getStaticPaths = async () => {
  const paths = await getAllPaths()
  // add '/' which is synonymous to '/index'
  return {
    paths,
    fallback: false,
  }
}

interface Props {}

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
  ...rest
}) => {
  const slug =
    typeof params?.slug == 'object' ? params?.slug.join('/') : params?.slug
  if (!slug) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const post = await getPost(slug)

  if (!post) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const data = post.data

  const backlinks = compact(
    await Promise.all(
      map(data.backlinks, (path: string) => {
        if (path) {
          // exclude the /notes/ part of the url
          const slug = first(path.match(/(?<=\/notes\/)(.*)/))
          if (slug) {
            return getPost(slug)
          }
        }
      }),
    ),
  ) as any

  return {
    props: {
      title: data.title || post.basename,
      hast: post.result,
      path: data.path,
      resourceLink: data?.roam_key || null,
      backlinks: backlinks.map((b: any) => ({
        slug: b.data.slug,
        title: b.data.title || b.basename,
        path: b.data.path,
      })),
    },
  }
}
