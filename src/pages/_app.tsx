import '../styles/globals.css'
import React from 'react'
import {AppProps} from 'next/app'
import {DefaultSeo} from 'next-seo'
import SEO from '../../next-seo.json'
import {ThemeProvider} from 'next-themes'
import {MDXProvider} from '@mdx-js/react'
import components from 'components/mdx-components'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <MDXProvider components={components}>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </MDXProvider>
    </>
  )
}

export default MyApp
