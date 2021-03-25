import React from 'react'
import Link from 'next/link'

export type PostData = {
  title: string
  slug: string
}

type Post = {
  data: PostData
}

interface ArticleItemProps {
  article: Post
}

const ArticleListItem = ({article}: ArticleItemProps) =>
  article ? (
    <li
      key={article.data.slug}
      className="dark:text-gray-300 dark:hover:text-purple-500 flex-grow py-3 px-2 rounded hover:shadow-lg hover:text-purple-800 cursor-pointer transition ease-in-out duration-300 transform hover:scale-105  text-gray-800"
    >
      <a href={article.data.slug}>{article?.data?.title}</a>
    </li>
  ) : null

interface ArticlesProps {
  articles: Post[]
}

const Articles = ({articles}: ArticlesProps) => {
  return (
    <ul className="font-serif text-gray-600 prose-xl list-none flex flex-wrap">
      {articles.map((article: Post) => (
        <ArticleListItem key={article?.data?.slug} article={article} />
      ))}
    </ul>
  )
}

export default Articles
