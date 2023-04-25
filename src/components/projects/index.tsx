import React from 'react'
import projects from './data.json'
import identity from 'lodash/identity'
import Tag from './tag'

const getProjects = (filter = identity) => {
  return projects.filter(filter).reverse()
}

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  url: string
}

const Projects = () => {
  const projects = getProjects((p: Project) => p.title.includes('Remix'))
  return (
    <div className="grid-cols-3 gap-4 grid">
      {projects.map((project) => (
        <>
          <a
            className="max-w-xs mr-5 mb-5 p-4 transition-all ease-in-out duration-300 flex-auto col-span-3 lg:col-span-1"
            key={project.title}
            href={project.url}
            aria-label={`View ${project.title}`}
          >
            <img src={project.image} height="auto" width="550" />
          </a>
          <div className="flex flex-col p-4 col-span-3 lg:col-span-2 w-5/6">
            <h3 className="max-w-xs font-sans prose-2xl dark:text-gray-300 mb-3">
              {project.title}
            </h3>
            <div className="flex mb-5">
              {project.tags.map((tag) => (
                <div style={{width: 25, height: 25}} className="mr-3">
                  <Tag name={tag} />
                </div>
              ))}
            </div>
            <p className="prose-xl dark:text-gray-300">{project.description}</p>
          </div>
        </>
      ))}
    </div>
  )
}

export default Projects
