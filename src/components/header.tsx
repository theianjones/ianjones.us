import React from 'react'
import Link from 'next/link'
import DarkModeToggle from './dark-mode-toggle'

function Header() {
  return (
    <header className="flex flex-row items-center justify-between pt-24 sm:pt-12 md:pt-16 mb-5">
      {/* <Logo /> */}
      <Link href="/">
        <a>
          <img
            className="h-12"
            alt="Ian Jones Logo"
            src="https://res.cloudinary.com/dzsq0psas/image/upload/v1616622188/blog/logo_dgvqfm.png"
          />
        </a>
      </Link>
      <nav className="flex items-center justify-between">
        <Link href={'/courses'}>
          <a className="dark:text-gray-300 mr-3 prose-xl font-light hover:text-primary ease-in-out text-gray-500 tracking-wider">
            Courses
          </a>
        </Link>
        <Link href={'/blog'}>
          <a className="dark:text-gray-300 prose-xl font-light hover:text-primary ease-in-out text-gray-500 tracking-wider">
            Blog
          </a>
        </Link>
      </nav>
    </header>
  )
}

export default Header
