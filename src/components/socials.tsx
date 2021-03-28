import React from 'react'

export type Social = {
  label: string
  url: string
}

export default () => (
  <>
    {[
      {
        label: 'Github',
        url: 'https://github.com/theianjones',
      },
      {
        label: 'Twitter',
        url: 'https://twitter.com/_jonesian',
      },
      {
        label: 'Email List',
        url: 'https://motivated-author-5788.ck.page/8610ba744e',
      },
    ].map((social) => (
      <a
        key={social.label}
        className="mr-3 prose-xl hover:text-primary ease-in-out text-gray-500 dark:text-gray-400 tracking-wider"
        href={social.url}
        target="_blank"
      >
        {social.label}
      </a>
    ))}
  </>
)
