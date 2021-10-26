import React from 'react'
import Link from 'next/link'
import cx from 'classnames'

import style from './articles.module.css'

export type Post = {
  title: string
  slug: string
  lastUpdated: string
}

interface ArticleItemProps {
  article: Post
}

export const ArticleListItem = ({article}: ArticleItemProps) =>
  article ? (
    <Link href={`/${article.slug}`}>
      <li
        key={article.slug}
        className={cx(
          'w-full flex-grow dark:text-gray-300 relative dark:hover:text-purple-400 py-3 sm:py-1 px-2 rounded hover:shadow-lg hover:text-purple-500 dark:hover:bg-gray-900 cursor-pointer transition ease-in-out duration-300 transform hover:scale-105  text-gray-800 hover:bg-white flex justify-between dark:border-gray-800 border-gray-50  mr-6 hover:border-0 border hover:border-white',
          style.articleItem,
        )}
      >
        <a className="pr-4">{article.title}</a>
        <span className="font-sans min-w-min prose-sm dark:text-gray-300 text-gray-500 ">
          {article.lastUpdated}
        </span>
      </li>
    </Link>
  ) : null

interface ArticlesProps {
  articles: Post[]
  className?: string
}

const Articles = ({articles, className}: ArticlesProps) => {
  return (
    <ul
      className={cx(
        'font-serif text-gray-600 prose-xl list-none flex flex-wrap items-baseline',
        className,
      )}
    >
      {articles.map((article: Post) => (
        <ArticleListItem key={article?.slug} article={article} />
      ))}
    </ul>
  )
}

export default Articles
