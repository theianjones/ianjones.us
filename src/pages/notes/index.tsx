import {GetStaticProps} from 'next'
import Head from 'next/head'
import {getPosts} from 'utils/post.server'
import Articles from 'components/articles'
import octokit from 'utils/octokit'

const Blog = ({posts}: any) => {
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
export default Blog
interface Props {}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPosts()

  return {
    props: {
      posts: posts.map((p: any) => ({
        title: p?.data.title || p.basename,
        slug: p?.data.slug,
        path: p?.data.path,
      })),
    },
  }
}
