import courses from './courses.json'
import identity from 'lodash/identity'

const getCourses = (filter = identity) => {
  return courses.filter(filter).reverse()
}
const Courses = () => {
  const courses = getCourses()
  return (
    <div className="flex flex-row flex-wrap">
      {courses.map((course: any) => (
        <a
          className="max-w-xs mr-5 mb-5 p-4 transition-all ease-in-out duration-300 border-gray-400 rounded-md shadow-sm hover:shadow-xl"
          key={course.id || course.slug}
          href={course.http_url}
          aria-label={`View ${course.title}`}
        >
          <img
            src={course.image || course.square_cover_480_url}
            height="auto"
            width="250"
          />
          <div className="flex flex-row items-center p-4">
            {course.image_thumb_url && (
              <img
                src={course.image_thumb_url}
                width="25"
                height="25"
                className="rounded-full"
              />
            )}
            <p className="ml-5 max-w-xs font-sans prose-lg dark:text-gray-300">
              {course.title}{' '}
            </p>
          </div>
        </a>
      ))}
    </div>
  )
}

export default Courses
