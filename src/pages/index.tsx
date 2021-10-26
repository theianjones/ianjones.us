import {jsx} from '@emotion/core'
import Head from 'next/head'
import DarkModeToggle from '../components/dark-mode-toggle'
import Courses from 'components/courses'
import Socials from 'components/socials'
import Articles, {Post} from 'components/articles'
import Image from 'next/image'
import nextSeo from '../../next-seo.json'
import Projects from 'components/projects'
import articlesData from '../../articles.json'
const {articles} = articlesData

export function getStaticProps() {
  return {
    props: {
      articles,
    },
  }
}

export default function Home({articles}: {articles: Post[]}) {
  return (
    <main>
      <Head>
        <title>Ian's Digital Garden</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="my-24 flex flex-row">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 dark:text-gray-100 font-serif">
            {nextSeo.description}
          </h1>
          <p className="mt-12 prose-xl dark:text-gray-300 md:w-3/4 w-100">
            👋 I'm Ian. I am a web developer from the Pacific North West but
            currently live in Northern Virginia. I love digital gardening and
            programming computers. I work primarily in Ruby and JavaScript but
            love functional programming languages.
          </p>
        </div>
        <div>
          <Image
            className="rounded-full"
            src="/family.png"
            height={240}
            width={300}
            layout="responsive"
          />
        </div>
      </section>
      <section className="my-20">
        <h2 className="text-gray-700 dark:text-gray-300 font-light text-4xl md:text-5xl mb-5 text-center md:text-justify">
          Featured Projects
        </h2>
        <Projects />
      </section>
      <section className="my-20">
        <h2 className="text-gray-700 dark:text-gray-300 font-light text-4xl md:text-5xl mb-5 text-center md:text-justify">
          Featured Articles
        </h2>
        <Articles
          articles={articles.filter(
            (article: Post) =>
              article.slug === 'own-your-second-brain' ||
              article.slug === 'xstate-saves-our-bacon',
          )}
        />
      </section>
      <section className="my-20">
        <h2 className="text-gray-700 dark:text-gray-300 text-4xl md:text-5xl mb-4 text-center md:text-justify">
          Video Courses
        </h2>
        <Courses />
      </section>
      <section className="my-20">
        <h2 className="text-gray-700 dark:text-gray-300 text-4xl md:text-5xl mb-4 text-center md:text-justify">
          All Articles
        </h2>
        <div className="lg:w-1/2 w-full">
          <Articles articles={articles} className="flex-col w-100" />
        </div>
      </section>
      <div className="flex items-center justify-between">
        <Socials />

        <DarkModeToggle />
      </div>
    </main>
  )
}
