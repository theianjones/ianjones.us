import React from 'react'

import unified from 'unified'
import rehype2react from 'rehype-react'
import highlight from 'rehype-prism'
import Link from './link'
// we use rehype-react to process hast and transform it to React
// component, which allows as replacing some of components with custom
// implementation. e.g., we can replace all <a> links to use
// `next/link`.
const processor = unified()
  .use(rehype2react, {
    createElement: React.createElement,
    Fragment: React.Fragment,
    components: {
      a: Link,
    },
  })
  .use(highlight)

const Rehype = ({hast}: any) => {
  return <>{processor.stringify(hast)}</>
}

export default Rehype
