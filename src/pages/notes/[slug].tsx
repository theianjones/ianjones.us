import React from 'react'
import Head from 'next/head'
import {getAllPaths} from 'utils/org.server'
import octokit from 'utils/octokit'
import Link from 'components/link'
import Rehype from 'components/rehype'
import {GetServerSideProps, GetStaticProps} from 'next'
import {last, map} from 'lodash'
import Articles from 'components/articles'
import {getPost} from 'utils/post.server'

const Note = ({title, hast, resourceLink, backlinks}: any) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="">
        <h1
          className={`text-4xl md:text-5xl my-12 text-gray-800 font-sans ${
            resourceLink ? 'mb-0' : 'mb-6'
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
        <div className="markdown article-width">
          <Rehype hast={hast} />
        </div>
      </main>
      {!!backlinks?.length && (
        <section className="article-width">
          <h2 className="prose-xl">Backlinks</h2>
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

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
  const slug =
    typeof params?.slug == 'object' ? params?.slug.join('') : params?.slug
  if (!slug) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  console.log({slug})
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
  console.log(data)
  const backlinks = (await Promise.all(
    map(data.backlinks, (path: string) => {
      if (path) {
        const slug = last(path.split('/'))
        if (slug) {
          return getPost(slug)
        }
      }
    }),
  )) as any
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
