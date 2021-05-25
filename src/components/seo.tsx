import React from 'react'
import seo from '../../config'
import qs from 'querystring'
import {NextSeo} from 'next-seo'
import seoJson from '../../next-seo.json'

interface SeoProps {
  isBlogPost: boolean
  metaData: any
}

const SEO = ({isBlogPost, metaData}: SeoProps) => {
  const postMeta = metaData || {}
  const title = postMeta.title || seoJson.title
  const description = postMeta.excerpt || seoJson.description
  const url = postMeta.path
    ? `${seo.canonicalUrl}/${postMeta.path}`
    : seo.canonicalUrl
  const datePublished = isBlogPost ? postMeta.datePublished : false
  const twitter = seoJson.twitter.handle
  const params = qs.stringify({title, author: twitter, v: '0.0.8'})
  const ogImage = `https://pedantic-payne-0af77d.netlify.app/opengraph?${params}`
  return (
    <NextSeo
      {...seoJson}
      openGraph={{
        ...seoJson.openGraph,
        images: [{url: ogImage, width: 1200, height: 627}],
      }}
      title={title}
      description={description}
      canonical={url}
    />
  )
}

export default SEO
