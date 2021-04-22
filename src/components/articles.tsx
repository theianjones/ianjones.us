import React from 'react'
import Link from 'next/link'
type Post = {
  title: string
  slug: string
  path: string
}

interface ArticleItemProps {
  article: Post
}

export const ArticleListItem = ({article}: ArticleItemProps) =>
  article ? (
    <li
      key={article.slug}
      className="dark:text-gray-300 dark:hover:text-purple-500 flex-grow py-3 px-2 rounded hover:shadow-lg hover:text-purple-800 dark:hover:bg-gray-900 cursor-pointer transition ease-in-out duration-300 transform hover:scale-105  text-gray-800 hover:bg-white"
    >
      <a href={article.path}>{article?.title}</a>
    </li>
  ) : null

interface ArticlesProps {
  articles: Post[]
}

const Articles = ({articles}: ArticlesProps) => {
  return (
    <ul className="font-serif text-gray-600 prose-xl list-none flex flex-wrap items-baseline">
      {articles.map((article: Post) => (
        <ArticleListItem key={article?.slug} article={article} />
      ))}
    </ul>
  )
}

export default Articles
