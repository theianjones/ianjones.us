import React from 'react'
import seo from '../../config'
import SchemaOrg from './schema'
import qs from 'querystring'
import {Helmet} from 'react-helmet'

interface SeoProps {
  isBlogPost: boolean
  metaData: any
}

const SEO = ({isBlogPost, metaData}: SeoProps) => {
  const postMeta = metaData || {}
  const title = postMeta.title || seo.title
  const description = postMeta.excerpt || seo.description
  const url = postMeta.path
    ? `${seo.canonicalUrl}/${postMeta.path}`
    : seo.canonicalUrl
  const datePublished = isBlogPost ? postMeta.datePublished : false
  const twitter = seo.twitterHandle
  const params = qs.stringify({title, author: twitter, v: '0.0.8'})
  const ogImage = `https://pedantic-payne-0af77d.netlify.app/opengraph?${params}`
  return (
    <>
      <Helmet>
        {/* General tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* OpenGraph tags */}
        <meta property="og:url" content={url} />
        {isBlogPost ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        {/* Twitter Card tags */}
        <meta
          name="twitter:card"
          content={isBlogPost ? 'summary_large_image' : 'summary'}
        />
        <meta name="twitter:creator" content={twitter} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      <SchemaOrg
        isBlogPost={isBlogPost}
        url={url}
        title={title}
        description={description}
        datePublished={datePublished}
        canonicalUrl={seo.canonicalUrl}
        author={seo.author}
        defaultTitle={seo.title}
      />
    </>
  )
}

export default SEO
