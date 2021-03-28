import {jsx} from '@emotion/core'
import Head from 'next/head'
import DarkModeToggle from '../components/dark-mode-toggle'
import Courses from 'components/courses'
import Socials from 'components/socials'
export default function Home() {
  return (
    <main>
      <Head>
        <title>Ian's Digital Garden</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="my-24">
        <h1 className="text-4xl md:text-6xl text-gray-800 dark:text-gray-100 font-sans">
          👋 Hey, I'm Ian
        </h1>
        <p className="font-serif mt-12 prose-xl max-w-60  dark:text-gray-300">
          My name is Ian Jones. I am a web developer from the Pacific North West
          but currently live in Northern Virginia. I love geeking out on note
          taking systems and programming computers.
        </p>
        <p className="font-serif mt-4 prose-xl max-w-60 dark:text-gray-300">
          I work primarily in Ruby and JavaScript but love functional
          programming languages. I'm currently learning Clojure/ClojureScript.
        </p>
        <p className="font-serif mt-5 prose-xl max-w-60  dark:text-gray-300">
          One of my hobbies is working on my personal knowledge management
          system. I publish my work in progress notes to my digital garden. Go
          take a look!
        </p>
      </section>
      <section className="my-20">
        <h2 className="text-gray-500 dark:text-gray-300 text-4xl md:text-6xl mb-5">
          Featured Articles
        </h2>
        {/* <Articles articles={data.featuredArticles} /> */}
      </section>
      <section className="my-20">
        <h2 className="text-gray-500 dark:text-gray-300 text-4xl md:text-6xl mb-4">
          Video Courses
        </h2>
        <Courses />
      </section>
      <div className="flex items-center justify-between">
        <Socials />

        <DarkModeToggle />
      </div>
    </main>
  )
}
