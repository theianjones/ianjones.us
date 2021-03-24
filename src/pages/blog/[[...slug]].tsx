import {join} from 'path'
import Head from 'next/head'
import axios from 'axios'
import {getAllPaths, getPostBySlug} from 'utils/org.server'

import Link from 'components/link'
import Rehype from 'components/rehype'
import {GetServerSideProps, GetStaticProps} from 'next'
import {map} from 'lodash'

const Note = ({title, hast, backlinks}: any) => {
  return (
    <main>
      <Head>
        <title>{title}</title>
      </Head>
      <h1 className="">{title}</h1>
      <div className="markdown">
        <Rehype hast={hast} />
      </div>
      {!!backlinks.length && (
        <section>
          <h2>{'Backlinks'}</h2>
          <ul>
            {backlinks.map((b: any) => (
              <li key={b.path}>
                <Link href={b.path}>{b.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
export default Note

// export const getStaticPaths = async () => {
//   const paths = await getAllPaths()
//   // add '/' which is synonymous to '/index'
//   paths.push('/')

//   return {
//     paths,
//     fallback: false,
//   }
// }

interface Props {}

interface Backlink {
  path: string
  data: {title: string}
  basename: string
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const slug =
    typeof params?.slug == 'object' ? params?.slug.join('') : params?.slug
  const {data: post} = (await axios.get('http://localhost:3000/api/github', {
    params: {slug},
  })) as any
  const data = post.data
  const backlinks = (await Promise.all(
    map(data.backlinks, getPostBySlug),
  )) as Backlink[]
  return {
    props: {
      title: data.title || post.basename,
      hast: post.result,
      backlinks: backlinks.map((b) => ({
        path: b.path,
        title: b.data.title || b.basename,
      })),
    },
  }
}
