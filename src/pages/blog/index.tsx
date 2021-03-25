import {join} from 'path'
import Head from 'next/head'
import axios from 'axios'
import {getAllPaths, getPostBySlug} from 'utils/org.server'

import Link from 'components/link'
import Rehype from 'components/rehype'
import {GetServerSideProps, GetStaticProps} from 'next'
import {map} from 'lodash'
import Articles from 'components/articles'

const Note = ({posts}: any) => {
  return (
    <main className="text-gray-800 dark:text-gray-300">
      <Head>
        <title>Ian's notes</title>
      </Head>
      <h1 className="text-4xl md:text-5xl font-bold my-12 font-sans">Notes</h1>
      <Articles articles={posts} />
    </main>
  )
}
export default Note
interface Props {}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const {data: posts} = (await axios.get(
    'http://localhost:3000/api/posts/',
  )) as any
  return {
    props: {
      posts,
    },
  }
}
