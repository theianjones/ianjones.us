declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
  let tableOfContents: () => any
  export {tableOfContents}
}

declare module '@mdx-js/react'
